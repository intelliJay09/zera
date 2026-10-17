"""Download Poly Haven (CC0) models, textures and HDRIs with their texture includes."""
import json, os, sys, urllib.request
UA={'User-Agent':'Mozilla/5.0 (zera-set-build)'}

OUT = sys.argv[1]
MODELS = sys.argv[2].split(',') if len(sys.argv) > 2 and sys.argv[2] else []
TEXTURES = sys.argv[3].split(',') if len(sys.argv) > 3 and sys.argv[3] else []
HDRIS = sys.argv[4].split(',') if len(sys.argv) > 4 and sys.argv[4] else []
RES = os.environ.get('PH_RES', '2k')

def get(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return
    os.makedirs(os.path.dirname(path), exist_ok=True)
    req=urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req) as r, open(path,'wb') as f: f.write(r.read())

def files(asset):
    with urllib.request.urlopen(urllib.request.Request(f'https://api.polyhaven.com/files/{asset}', headers=UA)) as r:
        return json.load(r)

for m in MODELS:
    f = files(m)
    if 'gltf' not in f:
        print('model', m, 'has no gltf, formats:', list(f.keys())); continue
    entry = f['gltf'][RES]['gltf'] if RES in f['gltf'] else f['gltf'][sorted(f['gltf'])[0]]['gltf']
    base = os.path.join(OUT, 'models', m)
    get(entry['url'], os.path.join(base, os.path.basename(entry['url'])))
    for rel, inc in entry.get('include', {}).items():
        get(inc['url'], os.path.join(base, rel))
    print('model', m, 'ok', len(entry.get('include', {})), 'includes')

for t in TEXTURES:
    f = files(t)
    base = os.path.join(OUT, 'textures', t)
    for kind in ['Diffuse', 'nor_gl', 'Rough', 'Displacement', 'Metal', 'AO']:
        if kind in f and RES in f[kind]:
            fmt = 'jpg' if 'jpg' in f[kind][RES] else sorted(f[kind][RES])[0]
            e = f[kind][RES][fmt]
            get(e['url'], os.path.join(base, os.path.basename(e['url'])))
    print('texture', t, 'ok')

for h in HDRIS:
    f = files(h)
    e = f['hdri'][RES]['hdr']
    get(e['url'], os.path.join(OUT, 'hdri', os.path.basename(e['url'])))
    print('hdri', h, 'ok')
