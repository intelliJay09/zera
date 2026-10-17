"""
Builds the reception of Sika & Shea, a fictional beauty studio in East Legon, and renders it with Cycles.

  blender -b -P counter_scene.py -- --time night|morning --mode preview|final [--out path] [--samples n] [--res WxH]

The reception desktop sits square to the counter, facing the receptionist's seat; the camera looks over that seat.
Night: the studio is closed; the desktop, left on at reception, takes a booking at 23:14.
Morning: the lights are on and the same desktop shows the month's report beside the owner's coffee.
Props and surfaces are Poly Haven (CC0). Screens and printed matter come from brand/pages (HTML).
"""
import bpy, bmesh, math, os, sys, json
from mathutils import Vector

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(ROOT, 'assets')
PAGES = os.path.join(ROOT, 'brand', 'pages')
FONTS = os.path.join(ROOT, 'fonts')
RENDERS = os.path.join(ROOT, 'renders'); os.makedirs(RENDERS, exist_ok=True)

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def arg(name, default=None):
    return argv[argv.index(name) + 1] if name in argv else default
def farg(name, default):
    return float(arg(name, str(default)))
def varg(name, default):
    return tuple(float(v) for v in arg(name, default).split(','))

MODE = arg('--mode', 'preview')
TIME = arg('--time', 'night')
NIGHT = TIME == 'night'
OUT = arg('--out', os.path.join(RENDERS, f'{TIME}-{MODE}.png'))
SAMPLES = int(arg('--samples', '48' if MODE == 'preview' else '256'))
RES = (1280, 720) if MODE == 'preview' else (2560, 1440)
if arg('--res'): RES = tuple(int(v) for v in arg('--res').split('x'))

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# ================================================================= helpers
def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c)

GREEN, CREAM, BRASS = srgb('#22352B'), srgb('#EEE5D6'), srgb('#B8955A')

def link(ob):
    scene.collection.objects.link(ob); return ob

def mesh_object(name, bm):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    return link(bpy.data.objects.new(name, me))

def box_uv(bm, scale=1.0):
    uv = bm.loops.layers.uv.verify()
    for f in bm.faces:
        ax = max(range(3), key=lambda i: abs(f.normal[i]))
        for l in f.loops:
            co = l.vert.co
            l[uv].uv = ((co.y, co.z) if ax == 0 else (co.x, co.z) if ax == 1 else (co.x, co.y))
            l[uv].uv = (l[uv].uv[0] * scale, l[uv].uv[1] * scale)

def smooth(ob, angle=30):
    for p in ob.data.polygons: p.use_smooth = True
    path = os.path.join(bpy.utils.system_resource('DATAFILES'), 'assets', 'geometry_nodes', 'smooth_by_angle.blend')
    if 'Smooth by Angle' not in bpy.data.node_groups and os.path.exists(path):
        with bpy.data.libraries.load(path, link=False) as (src, dst):
            dst.node_groups = ['Smooth by Angle']
    if 'Smooth by Angle' in bpy.data.node_groups:
        m = ob.modifiers.new('smooth', 'NODES'); m.node_group = bpy.data.node_groups['Smooth by Angle']
        m['Input_1'] = math.radians(angle)

def bevel(ob, width, segments=4):
    m = ob.modifiers.new('bevel', 'BEVEL'); m.width = width; m.segments = segments
    m.limit_method = 'ANGLE'; m.harden_normals = True
    smooth(ob)

def box(name, size, loc=(0, 0, 0), mat=None, uv_scale=1.0, bev=0.0, rot=(0, 0, 0)):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1.0); bmesh.ops.scale(bm, vec=size, verts=bm.verts)
    box_uv(bm, uv_scale); ob = mesh_object(name, bm); ob.location = loc; ob.rotation_euler = rot
    if bev: bevel(ob, bev)
    if mat: assign(ob, mat)
    return ob

def plane(name, w, h, loc=(0, 0, 0), rot=(0, 0, 0), mat=None, uv='box', uv_scale=1.0, flip_u=False):
    """A w x h plane in its local XY. uv='fit' maps the whole image across it."""
    bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5)
    bmesh.ops.scale(bm, vec=(w, h, 1), verts=bm.verts)
    if uv == 'fit':
        layer = bm.loops.layers.uv.verify()
        for f in bm.faces:
            for l in f.loops:
                u = l.vert.co.x / w + 0.5; v = l.vert.co.y / h + 0.5
                l[layer].uv = (1 - u if flip_u else u, v)
    else:
        box_uv(bm, uv_scale)
    ob = mesh_object(name, bm); ob.location = loc; ob.rotation_euler = rot
    if mat: assign(ob, mat)
    return ob

def rounded_rect(w, d, r, seg=10):
    pts = []; cx, cy = w / 2 - r, d / 2 - r
    for x, y, a0 in [(cx, cy, 0), (-cx, cy, math.pi / 2), (-cx, -cy, math.pi), (cx, -cy, 1.5 * math.pi)]:
        for i in range(seg + 1):
            a = a0 + (math.pi / 2) * i / seg; pts.append((x + r * math.cos(a), y + r * math.sin(a), 0))
    return pts

def slab(name, w, d, h, r, bev=0.0, mat=None, seg=10):
    bm = bmesh.new(); face = bm.faces.new([bm.verts.new(p) for p in rounded_rect(w, d, r, seg)])
    res = bmesh.ops.extrude_face_region(bm, geom=[face])
    bmesh.ops.translate(bm, verts=[g for g in res['geom'] if isinstance(g, bmesh.types.BMVert)], vec=(0, 0, h))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces); box_uv(bm)
    ob = mesh_object(name, bm)
    if bev: bevel(ob, bev, 6)
    else: smooth(ob)
    if mat: assign(ob, mat)
    return ob

def lathe(name, profile, segments=48, mat=None, cap_bottom=True, cap_top=True):
    """Spin a (radius, z) profile around Z. U wraps once around, V runs 0..1 up the profile."""
    bm = bmesh.new(); layer = bm.loops.layers.uv.verify()
    z0, z1 = profile[0][1], profile[-1][1]
    rings = []
    for r, z in profile:
        rings.append([bm.verts.new((r * math.cos(2 * math.pi * i / segments), r * math.sin(2 * math.pi * i / segments), z)) for i in range(segments)])
    for j in range(len(rings) - 1):
        for i in range(segments):
            a, b = rings[j][i], rings[j][(i + 1) % segments]; c, d = rings[j + 1][(i + 1) % segments], rings[j + 1][i]
            f = bm.faces.new([a, b, c, d])
            for l, (ii, jj) in zip(f.loops, [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]):
                l[layer].uv = (ii / segments, (profile[jj][1] - z0) / (z1 - z0 or 1))
    if cap_bottom: bm.faces.new(list(reversed(rings[0])))
    if cap_top: bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    ob = mesh_object(name, bm); smooth(ob, 50)
    if mat: assign(ob, mat)
    return ob

def img(path, noncolor=False):
    im = bpy.data.images.load(path, check_existing=True)
    if noncolor: im.colorspace_settings.name = 'Non-Color'
    return im

def assign(ob, mat):
    ob.data.materials.clear(); ob.data.materials.append(mat)

def solid(name, color, rough=0.5, metallic=0.0, coat=0.0, emit=None, strength=0.0, aniso=0.0, transmission=0.0, ior=1.45):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1); b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metallic; b.inputs['Coat Weight'].default_value = coat
    b.inputs['Anisotropic'].default_value = aniso; b.inputs['Transmission Weight'].default_value = transmission
    b.inputs['IOR'].default_value = ior
    if emit:
        b.inputs['Emission Color'].default_value = (*emit, 1); b.inputs['Emission Strength'].default_value = strength
    return m

def emitter(name, color, strength):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree
    nt.nodes.remove(nt.nodes['Principled BSDF']); e = nt.nodes.new('ShaderNodeEmission')
    e.inputs['Color'].default_value = (*color, 1); e.inputs['Strength'].default_value = strength
    nt.links.new(e.outputs[0], nt.nodes['Material Output'].inputs['Surface'])
    return m

def textured(name, path, rough=0.5, coat=0.0, metallic=0.0, emit=0.0, clip=True):
    """An image on a surface: printed matter (emit=0) or a lit display (emit>0, black glass base)."""
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = img(path); t.extension = 'CLIP' if clip else 'REPEAT'
    tc = nt.nodes.new('ShaderNodeTexCoord'); nt.links.new(tc.outputs['UV'], t.inputs['Vector'])
    b.inputs['Roughness'].default_value = rough; b.inputs['Coat Weight'].default_value = coat
    b.inputs['Metallic'].default_value = metallic
    if emit > 0:
        b.inputs['Base Color'].default_value = (0.01, 0.01, 0.012, 1); b.inputs['Coat Roughness'].default_value = 0.03
        nt.links.new(t.outputs['Color'], b.inputs['Emission Color']); b.inputs['Emission Strength'].default_value = emit
    else:
        nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
    return m

def pbr(name, folder, scale=1.0, color=None, tint=None, rough_mul=1.0, coat=0.0, normal=0.6, offset=(0, 0, 0)):
    """A Poly Haven texture set. color= paints it (keeps the surface relief), tint= multiplies the photo."""
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; L = nt.links; b = nt.nodes['Principled BSDF']
    b.inputs['Coat Weight'].default_value = coat
    mp = nt.nodes.new('ShaderNodeMapping'); tc = nt.nodes.new('ShaderNodeTexCoord')
    mp.inputs['Scale'].default_value = (scale,) * 3; mp.inputs['Location'].default_value = offset
    L.new(tc.outputs['UV'], mp.inputs['Vector'])
    prefix = os.path.basename(folder)
    def tex(kind, noncolor):
        p = os.path.join(folder, f'{prefix}_{kind}_2k.jpg')
        if not os.path.exists(p): return None
        n = nt.nodes.new('ShaderNodeTexImage'); n.image = img(p, noncolor); L.new(mp.outputs['Vector'], n.inputs['Vector']); return n
    d = tex('diff', False)
    if color:
        b.inputs['Base Color'].default_value = (*color, 1)
        if d:  # keep a whisper of the plaster's tonal variation
            mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'OVERLAY'
            mix.inputs['Factor'].default_value = 0.25; mix.inputs[6].default_value = (*color, 1)
            L.new(d.outputs['Color'], mix.inputs[7]); L.new(mix.outputs[2], b.inputs['Base Color'])
    elif d and tint:
        mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 1
        L.new(d.outputs['Color'], mix.inputs[6]); mix.inputs[7].default_value = (*tint, 1); L.new(mix.outputs[2], b.inputs['Base Color'])
    elif d:
        L.new(d.outputs['Color'], b.inputs['Base Color'])
    r = tex('rough', True)
    if r:
        mm = nt.nodes.new('ShaderNodeMath'); mm.operation = 'MULTIPLY'; mm.use_clamp = True; mm.inputs[1].default_value = rough_mul
        L.new(r.outputs['Color'], mm.inputs[0]); L.new(mm.outputs[0], b.inputs['Roughness'])
    n = tex('nor_gl', True)
    if n:
        nm = nt.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = normal
        L.new(n.outputs['Color'], nm.inputs['Color']); L.new(nm.outputs['Normal'], b.inputs['Normal'])
    return m

def glass_pane(name):
    """Clear glass that still lets lamps and daylight through (Cycles has no caustics here)."""
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; L = nt.links
    out = nt.nodes['Material Output']; g = nt.nodes['Principled BSDF']
    g.inputs['Base Color'].default_value = (1, 1, 1, 1); g.inputs['Roughness'].default_value = 0.0
    g.inputs['Transmission Weight'].default_value = 1.0; g.inputs['IOR'].default_value = 1.5
    tr = nt.nodes.new('ShaderNodeBsdfTransparent'); lp = nt.nodes.new('ShaderNodeLightPath'); mix = nt.nodes.new('ShaderNodeMixShader')
    L.new(lp.outputs['Is Shadow Ray'], mix.inputs['Fac']); L.new(g.outputs[0], mix.inputs[1]); L.new(tr.outputs[0], mix.inputs[2])
    L.new(mix.outputs[0], out.inputs['Surface'])
    return m

def import_gltf(asset, name=None):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ASSETS, 'models', asset, f'{asset}_2k.gltf'))
    new = [o for o in bpy.data.objects if o not in before]
    root = link(bpy.data.objects.new(name or asset, None))
    for o in new:
        if o.parent is None or o.parent not in new: o.parent = root
    return root, new

def bbox(objs):
    bpy.context.view_layer.update()
    pts = [o.matrix_world @ Vector(c) for o in objs if o.type == 'MESH' for c in o.bound_box]
    mn = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
    mx = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
    return mn, mx

def prop(asset, loc, rot_z=0.0, scale=1.0, name=None, keep=None):
    root, objs = import_gltf(asset, name)
    if keep:
        for o in list(objs):
            if o.type == 'MESH' and not keep(o.name): bpy.data.objects.remove(o, do_unlink=True); objs.remove(o)
    root.scale = (scale,) * 3; root.rotation_euler = (0, 0, rot_z)
    mn, mx = bbox(objs); c = (mn + mx) / 2
    root.location += Vector((loc[0] - c.x, loc[1] - c.y, loc[2] - mn.z))
    return root, objs

def light(name, kind, loc, energy, color=(1, 1, 1), size=0.1, aim=None, size_y=None, angle=1.0, spot=None):
    ld = bpy.data.lights.new(name, kind); ld.energy = energy; ld.color = color
    if kind == 'AREA': ld.shape = 'RECTANGLE'; ld.size = size; ld.size_y = size_y or size
    if kind in ('POINT', 'SPOT'): ld.shadow_soft_size = size
    if kind == 'SUN': ld.angle = math.radians(angle)
    if kind == 'SPOT' and spot: ld.spot_size = math.radians(spot[0]); ld.spot_blend = spot[1]
    ob = link(bpy.data.objects.new(name, ld)); ob.location = loc
    if aim is not None: ob.rotation_euler = (Vector(aim) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    return ob

def text(name, body, font, size, loc, rot, mat, extrude=0.0, spacing=1.0, align='CENTER', offset=0.0):
    tc = bpy.data.curves.new(name, 'FONT'); tc.body = body; tc.font = bpy.data.fonts.load(os.path.join(FONTS, font), check_existing=True)
    tc.size = size; tc.extrude = extrude; tc.align_x = align; tc.align_y = 'CENTER'; tc.space_character = spacing; tc.offset = offset
    if extrude: tc.bevel_depth = min(0.0006, extrude * 0.3); tc.bevel_resolution = 2
    ob = link(bpy.data.objects.new(name, tc)); ob.location = loc; ob.rotation_euler = rot
    ob.data.materials.append(mat)
    return ob

# ================================================================= render settings
scene.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons['cycles'].preferences
prefs.compute_device_type = 'METAL'; prefs.get_devices()
for d in prefs.devices: d.use = True
scene.cycles.device = 'GPU'
scene.cycles.samples = SAMPLES; scene.cycles.use_adaptive_sampling = True; scene.cycles.adaptive_threshold = 0.015
scene.cycles.use_denoising = True; scene.cycles.denoiser = 'OPENIMAGEDENOISE'
scene.cycles.max_bounces = 8; scene.cycles.glossy_bounces = 4; scene.cycles.transmission_bounces = 8; scene.cycles.transparent_max_bounces = 16
scene.cycles.caustics_reflective = False; scene.cycles.caustics_refractive = False; scene.cycles.blur_glossy = 1.0
scene.render.resolution_x, scene.render.resolution_y = RES; scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'; scene.render.image_settings.color_depth = '16'; scene.render.filepath = OUT
scene.view_settings.view_transform = 'AgX'
try: scene.view_settings.look = 'AgX - Punchy'
except Exception: pass
scene.view_settings.exposure = farg('--exposure', 1.0 if NIGHT else 0.15)

# ================================================================= world: the sky over the street
world = bpy.data.worlds.new('sky'); scene.world = world; world.use_nodes = True
bg = world.node_tree.nodes['Background']
bg.inputs['Color'].default_value = (*(srgb('#0b1424') if NIGHT else srgb('#cfe0f2')), 1)
bg.inputs['Strength'].default_value = farg('--sky', 0.04 if NIGHT else 2.2)

# ================================================================= materials
M = {
    'feature': pbr('feature_wall', os.path.join(ASSETS, 'textures', 'plastered_wall_04'), scale=0.6, color=GREEN, normal=0.35),
    'wall': pbr('wall', os.path.join(ASSETS, 'textures', 'plastered_wall_04'), scale=0.6, color=CREAM, normal=0.35),
    'floor': pbr('floor', os.path.join(ASSETS, 'textures', 'herringbone_parquet'), scale=0.5, tint=(0.95, 0.85, 0.72), coat=0.2),
    'stone': pbr('stone', os.path.join(ASSETS, 'textures', 'marble_01'), scale=0.3, rough_mul=0.8, coat=0.08, offset=(0.3, 0.4, 0)),
    'walnut': pbr('walnut', os.path.join(ASSETS, 'textures', 'walnut_veneer'), scale=1.2, coat=0.3),
    'pavement': pbr('pavement', os.path.join(ASSETS, 'textures', 'concrete_pavement'), scale=0.4, tint=(0.7, 0.7, 0.7)),
    'linen': pbr('linen', os.path.join(ASSETS, 'textures', 'rough_linen'), scale=6.0, color=CREAM, normal=0.8),
    'counter': solid('counter_paint', srgb('#283d31'), rough=0.42),
    'ceiling': solid('ceiling', CREAM, rough=0.9),
    'brass': solid('brass', BRASS, rough=0.3, metallic=1.0, aniso=0.35),
    'vinyl': solid('gold_vinyl', BRASS, rough=0.28, metallic=1.0),
    'frame': solid('black_frame', (0.012, 0.012, 0.012), rough=0.45, metallic=0.6),
    'glass': glass_pane('storefront_glass'),
    'alu': solid('aluminium', (0.42, 0.41, 0.40), rough=0.35, metallic=1.0, aniso=0.4),
    'alu_dark': solid('aluminium_dark', (0.14, 0.14, 0.15), rough=0.4, metallic=1.0),
    'black_glass': solid('black_glass', (0.004, 0.004, 0.005), rough=0.06, coat=1.0),
    'key': solid('key', (0.045, 0.045, 0.05), rough=0.55),
    'ceramic': solid('ceramic', srgb('#f1ece4'), rough=0.25, coat=0.6),
    'coffee': solid('coffee', srgb('#2b170c'), rough=0.08),
    'rubber': solid('rubber', (0.02, 0.02, 0.02), rough=0.7),
    'paper': solid('paper', CREAM, rough=0.8),
}

# ================================================================= the room
X0, X1, Y0, Y1, H = -3.0, 3.0, -3.0, 2.4, 3.0
plane('floor', X1 - X0, Y1 - Y0, (0, (Y0 + Y1) / 2, 0), mat=M['floor'])
plane('ceiling', X1 - X0, Y1 - Y0, (0, (Y0 + Y1) / 2, H), (math.pi, 0, 0), mat=M['ceiling'])
box('wall_back', (X1 - X0, 0.1, H), (0, Y1 + 0.05, H / 2), M['wall'], 0.6)
box('wall_left', (0.1, Y1 - Y0, H), (X0 - 0.05, (Y0 + Y1) / 2, H / 2), M['wall'], 0.6)
box('wall_right', (0.1, Y1 - Y0, H), (X1 + 0.05, (Y0 + Y1) / 2, H / 2), M['wall'], 0.6)

# front: shopfront glazing on the left, the green feature wall on the right
GX0, GX1, GZ0, GZ1 = -2.7, 0.3, 0.06, 2.62
FT = 0.15
box('front_feature', (X1 - GX1, FT, H), ((X1 + GX1) / 2, Y0 - FT / 2, H / 2), M['feature'], 0.6)
box('front_edge', (GX0 - X0, FT, H), ((X0 + GX0) / 2, Y0 - FT / 2, H / 2), M['wall'], 0.6)
box('front_head', (GX1 - GX0, FT, H - GZ1), ((GX0 + GX1) / 2, Y0 - FT / 2, (GZ1 + H) / 2), M['wall'], 0.6)
box('front_kerb', (GX1 - GX0, FT, GZ0), ((GX0 + GX1) / 2, Y0 - FT / 2, GZ0 / 2), M['frame'])
GY = Y0 - 0.06
plane('shopfront_glass', GX1 - GX0, GZ1 - GZ0, ((GX0 + GX1) / 2, GY, (GZ0 + GZ1) / 2), (math.pi / 2, 0, 0), mat=M['glass'])
for nm, size, loc in [
    ('mullion_door', (0.05, 0.08, GZ1 - GZ0), (-1.7, GY, (GZ0 + GZ1) / 2)),
    ('mullion_mid', (0.05, 0.08, GZ1 - GZ0), (-0.7, GY, (GZ0 + GZ1) / 2)),
    ('transom', (GX1 - GX0, 0.08, 0.05), ((GX0 + GX1) / 2, GY, 2.18)),
    ('frame_top', (GX1 - GX0, 0.09, 0.06), ((GX0 + GX1) / 2, GY, GZ1)),
    ('frame_left', (0.06, 0.09, GZ1 - GZ0), (GX0, GY, (GZ0 + GZ1) / 2)),
    ('frame_right', (0.06, 0.09, GZ1 - GZ0), (GX1, GY, (GZ0 + GZ1) / 2)),
    ('door_bar', (0.025, 0.025, 0.9), (-1.82, GY + 0.07, 1.05)),
]:
    box(nm, size, loc, M['frame'])

# the name on the glass, gold vinyl, reading from the street (so mirrored from in here)
text('vinyl_name', 'SIKA & SHEA', 'Marcellus-Regular.ttf', 0.2, (-0.7 + 0.0, GY + 0.004, 1.55), (math.pi / 2, 0, 0), M['vinyl'], extrude=0.0004, spacing=1.25)
text('vinyl_tag', 'BEAUTY STUDIO', 'Lato-Regular.ttf', 0.05, (-0.7, GY + 0.004, 1.36), (math.pi / 2, 0, 0), M['vinyl'], extrude=0.0003, spacing=1.6)

# the halo-lit brass logo on the feature wall, reading into the studio
LOGO = (farg('--logo-x', 1.65), Y0 + 0.055, farg('--logo-z', 1.95))
logo = text('logo', 'SIKA & SHEA', 'Marcellus-Regular.ttf', 0.24, LOGO, (math.pi / 2, 0, math.pi), M['brass'], extrude=0.008, spacing=1.22)
halo = text('logo_halo', 'SIKA & SHEA', 'Marcellus-Regular.ttf', 0.24, (LOGO[0], Y0 + 0.04, LOGO[2]), (math.pi / 2, 0, math.pi),
            emitter('halo', (1.0, 0.74, 0.48), farg('--halo', 450)), spacing=1.22, offset=-0.002)
halo.visible_camera = False; halo.visible_glossy = False
text('logo_tag', 'SKIN  ·  HAIR  ·  NAILS', 'Lato-Regular.ttf', 0.052, (LOGO[0], Y0 + 0.004, LOGO[2] - 0.27), (math.pi / 2, 0, math.pi), M['brass'], extrude=0.0012, spacing=1.5)

# waiting area under the logo
prop('modern_arm_chair_01', (LOGO[0] - 0.75, Y0 + 0.62, 0), rot_z=math.pi)
prop('modern_arm_chair_01', (LOGO[0] + 0.75, Y0 + 0.62, 0), rot_z=math.pi)
tr, tobjs = prop('side_table_01', (LOGO[0], Y0 + 0.4, 0), scale=0.85)
tmn, tmx = bbox(tobjs)
prop('ceramic_vase_04', (LOGO[0] - 0.05, Y0 + 0.4, tmx.z))
prop('anthurium_botany_01', (LOGO[0] - 0.05, Y0 + 0.4, tmx.z + 0.18), scale=0.35)
prop('pachira_aquatica_01', (X1 - 0.35, Y0 + 0.45, 0), rot_z=0.4, keep=lambda n: n.endswith('_c'))

# ================================================================= retail shelves on the right wall, lit from beneath
def product(kind, label, loc, rot_z=math.pi):
    x, y, z = loc
    if kind == 'pump':
        body = lathe('pump_body', [(0, 0), (0.03, 0.0), (0.032, 0.004), (0.032, 0.14), (0.026, 0.152), (0.013, 0.158)],
                     mat=textured('label_' + label, os.path.join(PAGES, label + '.png'), rough=0.32, coat=0.5))
        cap = lathe('pump_collar', [(0, 0.156), (0.015, 0.156), (0.015, 0.176), (0.005, 0.18), (0.005, 0.2), (0, 0.2)], mat=M['brass'])
        head = box('pump_head', (0.034, 0.014, 0.012), (0.01, 0, 0.206), M['brass'], bev=0.003)
        parts = [body, cap, head]
    elif kind == 'drop':
        body = lathe('drop_body', [(0, 0), (0.019, 0), (0.02, 0.004), (0.02, 0.068), (0.014, 0.078), (0.008, 0.082)],
                     mat=textured('label_' + label, os.path.join(PAGES, label + '.png'), rough=0.18, coat=0.8))
        cap = lathe('drop_cap', [(0, 0.08), (0.011, 0.08), (0.011, 0.102), (0, 0.102)], mat=M['brass'])
        bulb = lathe('drop_bulb', [(0, 0.102), (0.008, 0.102), (0.009, 0.115), (0.007, 0.128), (0, 0.132)], mat=M['rubber'])
        parts = [body, cap, bulb]
    else:  # jar
        body = lathe('jar_body', [(0, 0), (0.04, 0), (0.042, 0.004), (0.042, 0.048), (0.038, 0.05)],
                     mat=textured('label_' + label, os.path.join(PAGES, label + '.png'), rough=0.3, coat=0.4))
        lid = lathe('jar_lid', [(0, 0.048), (0.044, 0.048), (0.045, 0.068), (0.042, 0.071), (0, 0.071)], mat=M['brass'])
        parts = [body, lid]
    root = link(bpy.data.objects.new('product', None))
    for p in parts: p.parent = root
    root.location = (x, y, z); root.rotation_euler = (0, 0, rot_z)

SH_Y0, SH_Y1, SH_D = -2.55, -1.15, 0.24
for i, z in enumerate((0.95, 1.33, 1.71)):
    box(f'shelf_{i}', (SH_D, SH_Y1 - SH_Y0, 0.035), (X1 - SH_D / 2, (SH_Y0 + SH_Y1) / 2, z), M['walnut'], bev=0.003)
    led = box(f'shelf_led_{i}', (0.012, SH_Y1 - SH_Y0 - 0.04, 0.004), (X1 - SH_D + 0.03, (SH_Y0 + SH_Y1) / 2, z - 0.02),
              emitter(f'led_{i}', (1.0, 0.8, 0.6), farg('--led', 4 if NIGHT else 10)))
    led.visible_camera = False
    top = z + 0.0175
    row = [('pump', 'label-pump-green'), ('pump', 'label-pump-cream'), ('drop', 'label-drop-amber'), ('drop', 'label-drop-green'),
           ('jar', 'label-jar-cream'), ('pump', 'label-pump-green'), ('drop', 'label-drop-amber')]
    row = row[i:] + row[:i]
    n = 7; step = (SH_Y1 - SH_Y0 - 0.16) / (n - 1)
    for k, (kind, label) in enumerate(row[:n]):
        product(kind, label, (X1 - SH_D / 2 - 0.01, SH_Y0 + 0.08 + k * step, top), rot_z=math.pi + (k % 3 - 1) * 0.12)

# the price list, framed, on the right wall beside the shelves
MW, MH = 0.5, 0.5 * 1700 / 1200
box('menu_frame', (0.03, MW + 0.05, MH + 0.05), (X1 - 0.015, -0.55, 1.55), M['walnut'], bev=0.002)
plane('menu', MW, MH, (X1 - 0.032, -0.55, 1.55), (math.pi / 2, 0, -math.pi / 2), mat=textured('menu_print', os.path.join(PAGES, 'menu.png'), rough=0.7), uv='fit')

# ================================================================= the counter
CX0, CX1, CD, CH = -1.45, 1.0, 0.62, 1.02
box('counter_body', (CX1 - CX0, CD, CH), ((CX0 + CX1) / 2, CD / 2, CH / 2), M['counter'])
box('counter_kick', (CX1 - CX0 - 0.04, CD - 0.08, 0.08), ((CX0 + CX1) / 2, CD / 2, 0.04), M['frame'])
box('counter_top', (CX1 - CX0 + 0.06, CD + 0.08, 0.04), ((CX0 + CX1) / 2, CD / 2, CH + 0.02), M['stone'], bev=0.003)
box('counter_trim', (CX1 - CX0, 0.006, 0.012), ((CX0 + CX1) / 2, -0.003, CH - 0.03), M['brass'])
TOP = CH + 0.04

# recessed downlights over the counter
PEND = [(-0.85, 0.32), (0.4, 0.32), (1.65, -1.8), (-1.2, -1.8)]
for i, (px, py) in enumerate(PEND):
    lathe(f'downlight_can_{i}', [(0, H - 0.004), (0.045, H - 0.004), (0.045, H)], mat=M['frame'], cap_bottom=False)
    lathe(f'downlight_lens_{i}', [(0, H - 0.006), (0.032, H - 0.006)], mat=emitter(f'downlight_{i}', (1.0, 0.82, 0.62), 0 if NIGHT else 25), cap_bottom=False, cap_top=False)

# ================================================================= the reception desktop, square to the counter
# A 24-inch all-in-one (23.5" 16:9 panel), the size most reception desks carry. It faces the receptionist's seat.
DEV = (farg('--dev-x', -0.35), farg('--dev-y', 0.22), TOP)

def desktop(page):
    """Built facing -Y like a sheet of paper held up to the viewer, then turned to face the staff side (+Y)."""
    root = link(bpy.data.objects.new('desktop', None))
    foot = slab('desktop_foot', 0.17, 0.15, 0.007, 0.012, bev=0.002, mat=M['alu']); foot.parent = root; foot.location = (0, 0.01, 0)
    arm = box('desktop_arm', (0.09, 0.012, 0.29), (0, 0.045, 0.152), M['alu'], bev=0.003, rot=(math.radians(11.7), 0, 0)); arm.parent = root
    SW, SH = 0.520, 0.2925                      # active area
    BS, BT, BC, T = 0.0135, 0.016, 0.035, 0.0115  # side, top and chin bezels, panel thickness
    PW, PH = SW + 2 * BS, SH + BT + BC
    tilt = link(bpy.data.objects.new('desktop_tilt', None)); tilt.parent = root
    tilt.location = (0, 0, 0.095 + PH / 2); tilt.rotation_euler = (math.radians(85), 0, 0)
    body = slab('desktop_panel', PW, PH, T, 0.008, bev=0.0015, mat=M['alu_dark']); body.parent = tilt; body.location = (0, 0, -T)
    face = plane('desktop_face', PW - 0.002, PH - 0.002, (0, 0, 0.0002), mat=M['black_glass']); face.parent = tilt
    scr = plane('desktop_screen', SW, SH, (0, (BC - BT) / 2, 0.0004),
                mat=textured('desktop_screen', os.path.join(PAGES, page + '.png'), emit=farg('--screen', 3.0), rough=0.1, coat=1.0), uv='fit')
    scr.parent = tilt
    # keyboard and mouse on the receptionist's side
    KY, pitch, ks = -0.3, 0.0192, 0.0165
    box('keyboard', (0.285, 0.118, 0.007), (0, KY, 0.0035), M['alu'], bev=0.002).parent = root
    for r in range(6):
        for c in range(14):
            if r == 0 and 5 <= c <= 9: continue
            space = r == 0 and c == 4
            w = pitch * 6 - (pitch - ks) if space else ks
            x = 0.0 if space else (c - 6.5) * pitch
            box(f'key_{r}_{c}', (w, ks, 0.0012), (x, KY + (r - 2.5) * pitch, 0.0076), M['key'], bev=0.0004).parent = root
    mouse = slab('mouse', 0.057, 0.11, 0.012, 0.0265, bev=0.004, mat=M['alu']); mouse.parent = root; mouse.location = (0.24, KY + 0.01, 0)
    root.location = DEV; root.rotation_euler = (0, 0, math.pi)
    return root

desktop('bookings' if NIGHT else 'report')
if not NIGHT:
    # the owner's coffee, to the right of the keyboard
    MUG = (DEV[0] - 0.36, DEV[1] + 0.26, TOP)
    mug = lathe('mug', [(0, 0), (0.036, 0), (0.04, 0.006), (0.041, 0.09), (0.037, 0.092), (0.035, 0.08)], mat=M['ceramic'], cap_top=False)
    mug.location = MUG
    cof = lathe('coffee', [(0, 0.074), (0.035, 0.074)], mat=M['coffee'], cap_bottom=False, cap_top=False); cof.location = MUG
    bpy.ops.mesh.primitive_torus_add(major_radius=0.026, minor_radius=0.0065, location=(MUG[0] - 0.045, MUG[1], TOP + 0.048), rotation=(math.pi / 2, 0, 0))
    handle = bpy.context.active_object; assign(handle, M['ceramic']); smooth(handle)

# business cards in a brass holder, and a vase with stems
holder = box('card_holder', (0.1, 0.03, 0.025), (0.25, 0.16, TOP + 0.0125), M['brass'], bev=0.003)
card = plane('card', 0.089, 0.051, (0.25, 0.163, TOP + 0.045), (math.radians(70), 0, math.pi), mat=textured('card', os.path.join(PAGES, 'card.png'), rough=0.6), uv='fit')
prop('ceramic_vase_02', (-0.98, 0.18, TOP), scale=0.8)
prop('anthurium_botany_01', (-0.98, 0.18, TOP + 0.2), scale=0.3)
# ================================================================= the street outside
plane('pavement', 30, 14, (0, Y0 - 7.1, -0.12), mat=M['pavement'])
facade = plane('facade', 40, 7, (0, Y0 - 14, 2.5), (math.pi / 2, 0, 0))
fm = bpy.data.materials.new('facade'); fm.use_nodes = True; nt = fm.node_tree
nt.nodes.remove(nt.nodes['Principled BSDF']); br = nt.nodes.new('ShaderNodeTexBrick'); em = nt.nodes.new('ShaderNodeEmission'); tc = nt.nodes.new('ShaderNodeTexCoord')
br.inputs['Color1'].default_value = (0.02, 0.02, 0.025, 1); br.inputs['Color2'].default_value = ((1.0, 0.6, 0.32, 1) if NIGHT else (0.35, 0.33, 0.3, 1))
br.inputs['Mortar'].default_value = ((0.004, 0.004, 0.005, 1) if NIGHT else (0.55, 0.5, 0.45, 1)); br.inputs['Scale'].default_value = 0.35
br.inputs['Mortar Size'].default_value = 0.35; br.inputs['Bias'].default_value = -0.55; br.offset = 0.0; br.squash = 1.0
br.inputs['Brick Width'].default_value = 1.0; br.inputs['Row Height'].default_value = 0.8
nt.links.new(tc.outputs['Object'], br.inputs['Vector']); nt.links.new(br.outputs['Color'], em.inputs['Color'])
em.inputs['Strength'].default_value = 2.0 if NIGHT else 1.0
nt.links.new(em.outputs[0], nt.nodes['Material Output'].inputs['Surface']); assign(facade, fm)
prop('street_lamp_01', (-2.0, Y0 - 2.2, -0.12), rot_z=math.pi / 2)

# ================================================================= light
if NIGHT:
    # the street lamp's head, warm sodium, falling through the glass
    light('street_lamp', 'SPOT', (-2.0, Y0 - 2.0, 4.0), farg('--lamp', 2500), color=(1.0, 0.62, 0.32), size=0.15, aim=(-0.4, Y0 + 1.5, 0.6), spot=(95, 0.6))
    glow = light('shop_glow', 'AREA', (0.0, Y0 - 0.6, 2.6), 12, color=(0.55, 0.65, 1.0), size=3.0, size_y=1.0, aim=(0.5, 0.0, 0.8))
    glow.visible_camera = False; glow.visible_glossy = False; glow.visible_transmission = False
    for i, (px, py) in enumerate(PEND):
        pass  # pendants off: the studio is closed
else:
    sun = light('sun', 'SUN', (0, 0, 10), farg('--sun', 16.0), color=(1.0, 0.9, 0.76), angle=1.2)
    sun.rotation_euler = (Vector((farg('--sun-x', 0.55), farg('--sun-y', 1.0), -farg('--sun-z', 0.36))) * -1).to_track_quat('Z', 'Y').to_euler()
    for i, (px, py) in enumerate(PEND):
        light(f'downlight_{i}', 'SPOT', (px, py, H - 0.02), farg('--downlight', 60), color=(1.0, 0.8, 0.6), size=0.03, aim=(px, py, 0), spot=(60, 0.5))
# a ceiling wall-washer on the feature wall (left on a timer at night, as display lights usually are)
light('wall_wash', 'SPOT', (LOGO[0], Y0 + 0.7, H - 0.05), farg('--wash', 45 if NIGHT else 140), color=(1.0, 0.8, 0.6), size=0.04, aim=(LOGO[0], Y0, 1.3), spot=(70, 0.9))
light('portal', 'AREA', ((GX0 + GX1) / 2, GY + 0.05, (GZ0 + GZ1) / 2), 1, size=GX1 - GX0, size_y=GZ1 - GZ0, aim=((GX0 + GX1) / 2, 0, (GZ0 + GZ1) / 2)).data.cycles.is_portal = True

# ================================================================= camera: behind the receptionist's seat, looking straight down the room
CAM = varg('--cam', '0.15,1.85,1.62')
cd = bpy.data.cameras.new('cam'); cam = link(bpy.data.objects.new('cam', cd)); scene.camera = cam
cd.lens = farg('--lens', 24); cd.sensor_width = 36
LOOK = varg('--look', '0.15,-3.0,1.35')
cam.location = CAM; cam.rotation_euler = (Vector(LOOK) - Vector(CAM)).to_track_quat('-Z', 'Y').to_euler()
cd.dof.use_dof = True; cd.dof.aperture_fstop = farg('--fstop', 4.0)
cd.dof.focus_distance = (Vector(CAM) - Vector((DEV[0], DEV[1], TOP + 0.26))).length

bpy.context.view_layer.update()
if MODE == 'probe':
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(RENDERS, 'studio_probe.blend')); sys.exit(0)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(RENDERS, f'studio_{TIME}.blend'))
bpy.ops.render.render(write_still=True)
print('RENDERED', OUT)
