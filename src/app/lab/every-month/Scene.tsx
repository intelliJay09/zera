'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, useProgress, useTexture } from '@react-three/drei';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useEffect, useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { createScreens, type Fonts, type LaptopScreen, type Screens, type ScreenState } from './screens';

/**
 * The counter after closing, as a live scene: a laptop and a phone on dark wood, a dusk window to
 * the left, lit by an HDRI so the screens reflect the room and the room takes light from the
 * screens. The camera moves with the scroll; the screens play the month.
 */

export interface SceneProps {
  /** Scroll progress through the stage, 0 to 1, written by the page’s scroll timeline. */
  progress: MutableRefObject<number>;
  /** Whether the stage is on screen; the scene stops rendering when it is not. */
  active: boolean;
  isPhone: boolean;
  onReady: () => void;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* Where things sit, in metres. The counter top is y = 0. */
const LAPTOP_POS = new THREE.Vector3(-0.2, 0, -0.05);
const LAPTOP_YAW = 0.14;
const PHONE_POS = new THREE.Vector3(0.17, 0, 0.1);
const PHONE_YAW = -0.4;

interface Pose {
  pos: THREE.Vector3;
  look: THREE.Vector3;
}
const P = (px: number, py: number, pz: number, lx: number, ly: number, lz: number): Pose => ({
  pos: new THREE.Vector3(px, py, pz),
  look: new THREE.Vector3(lx, ly, lz),
});

/** The camera’s journey: wide, into the laptop, hold, across to the phone, hold, back out. */
const POSES: Pose[] = [
  P(0.08, 0.34, 1.0, -0.03, 0.02, -0.05),
  P(-0.08, 0.3, 0.62, -0.17, 0.06, -0.05),
  P(-0.03, 0.3, 0.64, -0.17, 0.06, -0.05),
  P(0.22, 0.31, 0.38, 0.17, -0.03, 0.1),
  P(0.24, 0.29, 0.4, 0.17, -0.03, 0.1),
  P(0.26, 0.32, 0.92, -0.04, 0.02, -0.05),
  P(0.32, 0.3, 0.98, -0.04, 0.02, -0.05),
];
/** Progress at which each pose is reached. */
const POSE_AT = [0.1, 0.26, 0.44, 0.56, 0.7, 0.86, 1.0];

function poseAt(p: number, out: Pose) {
  if (p <= POSE_AT[0]) {
    out.pos.copy(POSES[0].pos);
    out.look.copy(POSES[0].look);
    return;
  }
  for (let i = 1; i < POSES.length; i++) {
    if (p <= POSE_AT[i]) {
      const t = smooth(POSE_AT[i - 1], POSE_AT[i], p);
      out.pos.lerpVectors(POSES[i - 1].pos, POSES[i].pos, t);
      out.look.lerpVectors(POSES[i - 1].look, POSES[i].look, t);
      return;
    }
  }
  out.pos.copy(POSES[POSES.length - 1].pos);
  out.look.copy(POSES[POSES.length - 1].look);
}

function screenStateAt(p: number): ScreenState {
  const on = smooth(0.1, 0.16, p);
  const toRsvp = smooth(0.33, 0.39, p);
  const toReport = smooth(0.72, 0.78, p);
  let from: LaptopScreen = 'off';
  let to: LaptopScreen = 'booking';
  let t = on;
  let card = smooth(0.19, 0.25, p);
  if (p >= 0.36) {
    from = 'booking';
    to = 'rsvp';
    t = toRsvp;
    card = smooth(0.41, 0.47, p);
  }
  if (p >= 0.75) {
    from = 'rsvp';
    to = 'report';
    t = toReport;
    card = 0;
  }
  return {
    laptop: { from, to, t, card },
    phone: { on: smooth(0.54, 0.6, p), card: smooth(0.61, 0.67, p) },
  };
}

const PAGE_BRIGHTNESS: Record<LaptopScreen, number> = { off: 0, booking: 0.62, rsvp: 0.6, report: 0.75 };

function readFonts(): Fonts {
  const cs = getComputedStyle(document.documentElement);
  const sans = cs.getPropertyValue('--font-lato-regular').trim() || 'Lato, sans-serif';
  const display = cs.getPropertyValue('--font-lato-bold').trim() || sans;
  return { sans, display };
}

const ENV_ROTATION = new THREE.Euler(0, Math.PI * 0.5, 0);

/* Materials shared by the objects */
const aluminium = new THREE.MeshStandardMaterial({ color: '#6e6c69', metalness: 0.85, roughness: 0.42 });
const darkAluminium = new THREE.MeshStandardMaterial({ color: '#2b2a2c', metalness: 0.9, roughness: 0.3 });
const blackPlastic = new THREE.MeshStandardMaterial({ color: '#0b0b0c', metalness: 0.1, roughness: 0.55 });
const cream = new THREE.MeshStandardMaterial({ color: '#f5ece0', metalness: 0, roughness: 0.9 });
const creamBox = new THREE.MeshStandardMaterial({ color: '#efe3d2', metalness: 0, roughness: 0.85 });
const glass = new THREE.MeshStandardMaterial({
  color: '#000000',
  metalness: 1,
  roughness: 0.06,
  transparent: true,
  opacity: 0.16,
  envMapIntensity: 1.4,
  depthWrite: false,
});

function keyboardTexture() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 420;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#111113';
  ctx.fillRect(0, 0, c.width, c.height);
  const cols = 14;
  const rows = 5;
  const kw = 1024 / cols;
  const kh = 420 / rows;
  for (let r = 0; r < rows; r++) {
    for (let k = 0; k < cols; k++) {
      ctx.fillStyle = '#26262a';
      ctx.beginPath();
      ctx.roundRect(k * kw + 5, r * kh + 5, kw - 10, kh - 10, 6);
      ctx.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function windowTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#c98a68');
  g.addColorStop(0.45, '#f0b07a');
  g.addColorStop(0.7, '#d4836a');
  g.addColorStop(1, '#4a2a2e');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 256);
  // a far city line, soft
  ctx.fillStyle = 'rgba(60, 30, 36, 0.55)';
  for (let i = 0; i < 12; i++) {
    const bw = 3 + ((i * 7) % 6);
    const bh = 14 + ((i * 13) % 28);
    ctx.fillRect(i * 5.4, 190 - bh, bw, bh + 70);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

interface AreaLightProps {
  position: [number, number, number];
  lookAt: [number, number, number];
  width: number;
  height: number;
  intensity: number;
  color: string;
}

/** A rect area light aimed at a point; three.js lights face their own -Z, so we point them. */
function AreaLight({ position, lookAt, width, height, intensity, color }: AreaLightProps) {
  const ref = useRef<THREE.RectAreaLight>(null);
  useLayoutEffect(() => {
    ref.current?.lookAt(new THREE.Vector3(...lookAt));
  }, [lookAt]);
  return <rectAreaLight ref={ref} position={position} width={width} height={height} intensity={intensity} color={color} />;
}

function Counter() {
  const [diff, nor, rough] = useTexture([
    '/lab/dark_wood_diff_1k.jpg',
    '/lab/dark_wood_nor_gl_1k.jpg',
    '/lab/dark_wood_rough_1k.jpg',
  ]);
  useLayoutEffect(() => {
    for (const t of [diff, nor, rough]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(2.4, 1.2);
      t.anisotropy = 8;
    }
    diff.colorSpace = THREE.SRGBColorSpace;
  }, [diff, nor, rough]);
  return (
    <mesh position={[0, -0.03, 0]} receiveShadow>
      <boxGeometry args={[2.6, 0.06, 1.2]} />
      <meshStandardMaterial map={diff} normalMap={nor} roughnessMap={rough} roughness={0.75} metalness={0} />
    </mesh>
  );
}

function Room() {
  const win = useMemo(() => windowTexture(), []);
  const mirrorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d8d2c8', metalness: 1, roughness: 0.08 }), []);
  return (
    <group>
      {/* back wall, dusty plaster */}
      <mesh position={[0, 0.9, -0.95]}>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#4a312d" roughness={1} />
      </mesh>
      {/* a shelf line and a round mirror, out of focus */}
      <mesh position={[0.55, 0.42, -0.9]}>
        <boxGeometry args={[1.6, 0.03, 0.12]} />
        <meshStandardMaterial color="#2a1c17" roughness={0.8} />
      </mesh>
      <mesh position={[0.85, 0.95, -0.93]} rotation={[0, 0, 0]} material={mirrorMat}>
        <circleGeometry args={[0.28, 48]} />
      </mesh>
      {/* the window, back left: a warm dusk gradient that lights the room, behind dark mullions */}
      <mesh position={[-0.78, 0.72, -0.94]}>
        <planeGeometry args={[1.05, 0.95]} />
        <meshStandardMaterial map={win} emissiveMap={win} emissive="#ffffff" emissiveIntensity={1.9} color="#000000" />
      </mesh>
      {[
        [-0.78, 0.72, 0.02, 0.95],
        [-0.78, 0.72, 1.05, 0.02],
        [-1.315, 0.72, 0.03, 0.99],
        [-0.245, 0.72, 0.03, 0.99],
        [-0.78, 1.21, 1.1, 0.03],
        [-0.78, 0.23, 1.1, 0.03],
      ].map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, -0.93]}>
          <boxGeometry args={[w, h, 0.025]} />
          <meshStandardMaterial color="#1a1210" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

interface LaptopProps {
  screen: THREE.Texture;
  light: MutableRefObject<THREE.RectAreaLight | null>;
}

function Laptop({ screen, light }: LaptopProps) {
  const keys = useMemo(() => keyboardTexture(), []);
  const base = useMemo(() => new RoundedBoxGeometry(0.31, 0.012, 0.22, 3, 0.004), []);
  const lid = useMemo(() => new RoundedBoxGeometry(0.31, 0.21, 0.006, 3, 0.003), []);
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: screen,
        emissiveMap: screen,
        emissive: '#ffffff',
        emissiveIntensity: 0,
        color: '#000000',
        roughness: 0.3,
        metalness: 0,
      }),
    [screen]
  );
  return (
    <group position={LAPTOP_POS} rotation={[0, LAPTOP_YAW, 0]}>
      <mesh geometry={base} material={aluminium} position={[0, 0.006, 0]} castShadow />
      {/* keyboard well and trackpad */}
      <mesh position={[0, 0.0122, -0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.27, 0.11]} />
        <meshStandardMaterial map={keys} roughness={0.6} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.0122, 0.068]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.11, 0.07]} />
        <meshStandardMaterial color="#5e5c59" metalness={0.8} roughness={0.45} />
      </mesh>
      {/* the lid, hinged at the back, open a little past vertical */}
      <group position={[0, 0.012, -0.105]} rotation={[-0.3, 0, 0]}>
        <mesh geometry={lid} material={aluminium} position={[0, 0.105, 0]} castShadow />
        <mesh position={[0, 0.105, 0.0032]} material={blackPlastic}>
          <planeGeometry args={[0.3, 0.2]} />
        </mesh>
        <mesh position={[0, 0.107, 0.0036]} material={screenMat} name="laptopScreen">
          <planeGeometry args={[0.288, 0.18]} />
        </mesh>
        <mesh position={[0, 0.107, 0.0039]} material={glass}>
          <planeGeometry args={[0.3, 0.2]} />
        </mesh>
        <rectAreaLight
          ref={light}
          position={[0, 0.107, 0.02]}
          rotation={[0, Math.PI, 0]}
          width={0.29}
          height={0.18}
          intensity={0}
          color="#ffe6cc"
        />
      </group>
    </group>
  );
}

interface PhoneProps {
  screen: THREE.Texture;
  light: MutableRefObject<THREE.RectAreaLight | null>;
}

function Phone({ screen, light }: PhoneProps) {
  const body = useMemo(() => new RoundedBoxGeometry(0.0715, 0.0078, 0.1475, 4, 0.0075), []);
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: screen,
        emissiveMap: screen,
        emissive: '#ffffff',
        emissiveIntensity: 0,
        color: '#000000',
        roughness: 0.25,
        metalness: 0,
      }),
    [screen]
  );
  return (
    <group position={PHONE_POS} rotation={[0, PHONE_YAW, 0]}>
      <mesh geometry={body} material={darkAluminium} position={[0, 0.0039, 0]} castShadow />
      <mesh position={[0, 0.0079, 0]} rotation={[-Math.PI / 2, 0, 0]} material={screenMat} name="phoneScreen">
        <planeGeometry args={[0.066, 0.142]} />
      </mesh>
      <mesh position={[0, 0.0081, 0]} rotation={[-Math.PI / 2, 0, 0]} material={glass}>
        <planeGeometry args={[0.07, 0.146]} />
      </mesh>
      <rectAreaLight
        ref={light}
        position={[0, 0.02, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        width={0.066}
        height={0.142}
        intensity={0}
        color="#ffe3c8"
      />
    </group>
  );
}

function Cards() {
  const box = useMemo(() => new RoundedBoxGeometry(0.12, 0.075, 0.09, 2, 0.004), []);
  return (
    <group position={[0.36, 0, -0.16]} rotation={[0, 0.3, 0]}>
      <mesh geometry={box} material={creamBox} position={[0, 0.0375, 0]} castShadow />
      <mesh position={[-0.02, 0.052, 0.062]} rotation={[-0.22, 0, 0]} material={cream} castShadow>
        <boxGeometry args={[0.148, 0.105, 0.0012]} />
      </mesh>
      <mesh position={[0.012, 0.05, 0.07]} rotation={[-0.26, 0.05, 0]} material={cream} castShadow>
        <boxGeometry args={[0.148, 0.105, 0.0012]} />
      </mesh>
    </group>
  );
}

interface RigProps {
  progress: MutableRefObject<number>;
  screens: Screens;
  laptopLight: MutableRefObject<THREE.RectAreaLight | null>;
  phoneLight: MutableRefObject<THREE.RectAreaLight | null>;
  focus: THREE.Vector3;
  isPhone: boolean;
}

/** Moves the camera, plays the screens and turns their light on, every frame. */
function Rig({ progress, screens, laptopLight, phoneLight, focus, isPhone }: RigProps) {
  const { camera, scene } = useThree();
  const target = useMemo<Pose>(() => ({ pos: new THREE.Vector3(), look: new THREE.Vector3() }), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const laptopMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const phoneMat = useRef<THREE.MeshStandardMaterial | null>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = isPhone ? 48 : 31;
    cam.near = 0.05;
    cam.far = 20;
    cam.updateProjectionMatrix();
  }, [camera, isPhone]);

  useFrame((_, dt) => {
    const p = progress.current;
    poseAt(p, target);
    if (isPhone) {
      // a portrait frame: pull back and look a little lower so the counter fills the bottom
      target.pos.multiplyScalar(1.25);
      target.look.y -= 0.06;
    }
    const k = first.current ? 1 : 1 - Math.exp(-dt * 6);
    first.current = false;
    camera.position.lerp(target.pos, k);
    look.lerp(target.look, k);
    camera.lookAt(look);
    focus.copy(look);

    const s = screenStateAt(p);
    screens.update(s);

    if (!laptopMat.current) {
      const m = scene.getObjectByName('laptopScreen') as THREE.Mesh | null;
      laptopMat.current = (m?.material as THREE.MeshStandardMaterial) ?? null;
      const ph = scene.getObjectByName('phoneScreen') as THREE.Mesh | null;
      phoneMat.current = (ph?.material as THREE.MeshStandardMaterial) ?? null;
    }
    const lapBright =
      PAGE_BRIGHTNESS[s.laptop.from] * (1 - s.laptop.t) + PAGE_BRIGHTNESS[s.laptop.to] * s.laptop.t;
    if (laptopMat.current) laptopMat.current.emissiveIntensity = 1.0 * lapBright;
    if (laptopLight.current) laptopLight.current.intensity = 6 * lapBright;
    if (phoneMat.current) phoneMat.current.emissiveIntensity = 1.3 * s.phone.on;
    if (phoneLight.current) phoneLight.current.intensity = 5 * s.phone.on;
  });
  return null;
}

function Ready({ onReady }: { onReady: () => void }) {
  const { active, progress } = useProgress();
  useEffect(() => {
    if (!active && progress >= 100) onReady();
  }, [active, progress, onReady]);
  return null;
}

function Effects({ isPhone }: { isPhone: boolean }) {
  return (
    <EffectComposer multisampling={isPhone ? 0 : 4}>
      <Bloom luminanceThreshold={0.92} luminanceSmoothing={0.25} intensity={0.4} mipmapBlur />
      <Vignette offset={0.25} darkness={0.7} />
      <Noise opacity={0.06} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}

export default function Scene({ progress, active, isPhone, onReady }: SceneProps) {
  const laptopLight = useRef<THREE.RectAreaLight | null>(null);
  const phoneLight = useRef<THREE.RectAreaLight | null>(null);
  const focus = useMemo(() => new THREE.Vector3(-0.03, 0.1, -0.05), []);
  const screens = useMemo(() => {
    RectAreaLightUniformsLib.init();
    return createScreens(readFonts());
  }, []);
  useEffect(() => () => screens.dispose(), [screens]);

  return (
    <Canvas
      dpr={isPhone ? 1 : [1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
      camera={{ position: [0.08, 0.3, 1.0], fov: 31, near: 0.05, far: 20 }}
      shadows={false}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#050505']} />
      <Environment files="/lab/cayley_interior_1k.hdr" environmentIntensity={0.55} environmentRotation={ENV_ROTATION} />
      {/* the window’s light and a soft fill from the room */}
      <AreaLight position={[-0.78, 0.72, -0.9]} lookAt={[-0.1, 0.05, 0.3]} width={1.05} height={0.95} intensity={4.5} color="#ffb57f" />
      <AreaLight position={[0.9, 0.9, 1.2]} lookAt={[0, 0.05, 0]} width={1.5} height={1.0} intensity={0.5} color="#dcae86" />
      <Room />
      <Counter />
      <Laptop screen={screens.laptop} light={laptopLight} />
      <Phone screen={screens.phone} light={phoneLight} />
      <Cards />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.75} scale={2.2} blur={2.4} far={0.5} resolution={512} color="#000000" />
      <Rig progress={progress} screens={screens} laptopLight={laptopLight} phoneLight={phoneLight} focus={focus} isPhone={isPhone} />
      <Effects isPhone={isPhone} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
