/**
 * The Solid Seal, defined once in its 512-unit space (docs/style-guide.md, "The mark").
 * Every rendering of the mark is generated from these numbers, never redrawn.
 */

export const SEAL_CANVAS = 512;
export const SEAL_CENTER = 256;
export const SEAL_RADIUS = 252;

/** The Z knockout, clockwise, in the 512 space (y grows downwards). */
export const SEAL_Z: ReadonlyArray<readonly [number, number]> = [
  [134, 154],
  [378, 154],
  [208, 306],
  [378, 306],
  [378, 358],
  [134, 358],
  [304, 206],
  [134, 206],
];

export const SEAL_COPPER = '#B87333';
export const SEAL_CREAM = '#F3E9DC';

/** Point-in-polygon test against the Z (ray casting), in 512 space. */
export function isInsideZ(x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = SEAL_Z.length - 1; i < SEAL_Z.length; j = i++) {
    const [xi, yi] = SEAL_Z[i];
    const [xj, yj] = SEAL_Z[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** True where the seal carries copper: inside the disc and outside the Z. */
export function isOnSeal(x: number, y: number): boolean {
  const dx = x - SEAL_CENTER;
  const dy = y - SEAL_CENTER;
  return dx * dx + dy * dy <= SEAL_RADIUS * SEAL_RADIUS && !isInsideZ(x, y);
}

/**
 * Draw the seal into a 2D canvas context of any size.
 * `disc` and `z` are fill styles; pass the same colour family the scene needs.
 */
export function drawSeal(
  ctx: CanvasRenderingContext2D,
  size: number,
  disc: string,
  z: string,
  inset = 0
): void {
  const s = (size - inset * 2) / SEAL_CANVAS;
  ctx.save();
  ctx.translate(inset, inset);
  ctx.scale(s, s);
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(SEAL_CENTER, SEAL_CENTER, SEAL_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = z;
  ctx.beginPath();
  SEAL_Z.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** The Z knockout as an SVG path, in the 512 space. */
export const SEAL_Z_PATH = SEAL_Z.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ') + ' Z';
