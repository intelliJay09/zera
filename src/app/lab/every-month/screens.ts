import * as THREE from 'three';

/**
 * What plays on the two screens in the scene, drawn to canvas textures so it is lit, reflected
 * and graded with everything else instead of sitting on top of the picture.
 *
 * The content is real: the services and prices are from the booking page Zera built for
 * Finest Dietitian, the opening details are Allure Bloom's. The names and times are a
 * demonstration, and the page says so.
 */

export type LaptopScreen = 'off' | 'booking' | 'rsvp' | 'report';

export interface ScreenState {
  laptop: { from: LaptopScreen; to: LaptopScreen; t: number; card: number };
  phone: { on: number; card: number };
}

export interface Fonts {
  sans: string;
  display: string;
}

const INK = '#B87333';
const CREAM = '#F3E9DC';
const SHEET = '#050505';

const LAPTOP_PX = { w: 2048, h: 1280 };
const PHONE_PX = { w: 1170, h: 2532 };

const SERVICES: [string, string, string][] = [
  ['General consultation', '45 min', 'GH₵600'],
  ['Women’s health consultation', '1 h', 'GH₵1,200'],
  ['Gut care', '1 h', 'GH₵800'],
  ['Diabetes consultation', '2 h', 'GH₵800'],
  ['Weight management consultation', '1 h 30 min', 'GH₵800'],
  ['Fertility and maternity consultation', '2 h', 'GH₵800'],
];

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function ctxOf(c: HTMLCanvasElement) {
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('2D canvas is not available');
  return ctx;
}

function font(family: string, px: number, weight = 400) {
  return `${weight} ${px}px ${family}`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** The Finest Dietitian booking page, as it is: light page, serif title, services with prices. */
function drawBooking(ctx: CanvasRenderingContext2D, f: Fonts) {
  const { w, h } = LAPTOP_PX;
  ctx.fillStyle = '#F7F4F6';
  ctx.fillRect(0, 0, w, h);
  // top bar
  ctx.fillStyle = '#1b1419';
  ctx.fillRect(0, 0, w, 120);
  ctx.fillStyle = '#ffffff';
  ctx.font = font(f.sans, 30, 700);
  ctx.fillText('Finest Dietitian', 90, 74);
  ctx.font = font(f.sans, 22, 400);
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.letterSpacing = '3px';
  const nav = ['CONDITIONS', 'ABOUT', 'HOW IT WORKS', 'STORIES', 'BMI CALCULATOR'];
  let nx = 900;
  for (const item of nav) {
    ctx.fillText(item, nx, 70);
    nx += ctx.measureText(item).width + 56;
  }
  ctx.letterSpacing = '0px';
  ctx.fillStyle = '#7ec14b';
  roundRect(ctx, w - 420, 32, 330, 56, 28);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = font(f.sans, 20, 700);
  ctx.letterSpacing = '2px';
  ctx.fillText('BOOK A CONSULTATION', w - 390, 68);
  ctx.letterSpacing = '0px';

  // title
  ctx.fillStyle = '#6b6470';
  ctx.font = font(f.sans, 20, 400);
  ctx.letterSpacing = '4px';
  ctx.fillText('BOOK', 180, 250);
  ctx.letterSpacing = '0px';
  ctx.fillStyle = '#17121a';
  ctx.font = `400 128px Georgia, "Times New Roman", serif`;
  ctx.fillText('Book a consultation', 176, 380);

  // services
  ctx.fillStyle = '#17121a';
  ctx.font = `400 46px Georgia, "Times New Roman", serif`;
  ctx.fillText('Choose a service', 236, 520);
  ctx.fillStyle = '#9a8fa3';
  ctx.font = font(f.sans, 30, 400);
  ctx.fillText('01', 180, 520);
  let y = 572;
  for (const [name, length, price] of SERVICES) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(180, y, 900, 102);
    ctx.strokeStyle = '#e6e1ea';
    ctx.lineWidth = 2;
    ctx.strokeRect(180, y, 900, 102);
    ctx.fillStyle = '#17121a';
    ctx.font = font(f.sans, 28, 400);
    ctx.fillText(name, 208, y + 46);
    ctx.fillStyle = '#7a7382';
    ctx.font = font(f.sans, 20, 400);
    ctx.fillText(length, 208, y + 82);
    ctx.fillStyle = '#17121a';
    ctx.font = font(f.sans, 28, 400);
    const pw = ctx.measureText(price).width;
    ctx.fillText(price, 1080 - 28 - pw, y + 46);
    y += 114;
  }
  // summary panel
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(1180, 520, 690, 220);
  ctx.fillStyle = '#9a8fa3';
  ctx.font = font(f.sans, 20, 400);
  ctx.letterSpacing = '3px';
  ctx.fillText('YOUR BOOKING', 1220, 580);
  ctx.letterSpacing = '0px';
  ctx.fillStyle = '#4a4450';
  ctx.font = font(f.sans, 26, 400);
  ctx.fillText('Choose a service to begin.', 1220, 640);
}

/** The Allure Bloom grand-opening RSVP page: espresso and cream. */
function drawRsvp(ctx: CanvasRenderingContext2D, f: Fonts) {
  const { w, h } = LAPTOP_PX;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#2a1a12');
  g.addColorStop(1, '#1a100b');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(243,233,220,0.7)';
  ctx.font = font(f.sans, 24, 400);
  ctx.letterSpacing = '10px';
  ctx.fillText('ALLURE BLOOM', w / 2, 200);
  ctx.fillText('YOU ARE INVITED TO THE', w / 2, 330);
  ctx.letterSpacing = '0px';
  ctx.fillStyle = CREAM;
  ctx.font = `400 150px Georgia, "Times New Roman", serif`;
  ctx.fillText('Grand Opening', w / 2, 480);
  ctx.font = font(f.sans, 26, 400);
  ctx.fillStyle = 'rgba(243,233,220,0.75)';
  ctx.letterSpacing = '6px';
  ctx.fillText('OF THE NEW ALLURE BLOOM STUDIO, BAWALESHIE', w / 2, 560);
  ctx.letterSpacing = '0px';
  ctx.strokeStyle = 'rgba(243,233,220,0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 420, 640);
  ctx.lineTo(w / 2 + 420, 640);
  ctx.stroke();
  ctx.fillStyle = 'rgba(243,233,220,0.6)';
  ctx.font = font(f.sans, 22, 400);
  ctx.letterSpacing = '5px';
  ctx.fillText('OCTOBER', w / 2, 720);
  ctx.letterSpacing = '0px';
  ctx.fillStyle = CREAM;
  ctx.font = `400 220px Georgia, "Times New Roman", serif`;
  ctx.fillText('17', w / 2, 930);
  ctx.fillStyle = 'rgba(243,233,220,0.7)';
  ctx.font = font(f.sans, 24, 400);
  ctx.letterSpacing = '6px';
  ctx.fillText('RSVP', w / 2, 1060);
  ctx.letterSpacing = '0px';
  ctx.strokeStyle = 'rgba(243,233,220,0.5)';
  ctx.strokeRect(w / 2 - 170, 1090, 340, 70);
  ctx.textAlign = 'left';
}

/** The month’s report: Zera’s own sheet, near-black with copper. */
function drawReport(ctx: CanvasRenderingContext2D, f: Fonts) {
  const { w, h } = LAPTOP_PX;
  ctx.fillStyle = SHEET;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = INK;
  ctx.font = font(f.sans, 26, 400);
  ctx.letterSpacing = '7px';
  ctx.fillText('REVENUE SYSTEM REPORT · OCTOBER', 160, 190);
  ctx.letterSpacing = '0px';
  ctx.fillStyle = CREAM;
  ctx.font = font(f.display, 112, 700);
  ctx.fillText('What the system caught', 156, 360);
  ctx.fillText('this month.', 156, 480);
  const figures: [string, string][] = [
    ['BOOKINGS TAKEN', '1'],
    ['CUSTOMERS BROUGHT BACK', '1'],
    ['REVENUE CAUGHT', 'GHS 600'],
  ];
  let x = 160;
  for (const [k, v] of figures) {
    ctx.fillStyle = 'rgba(243,233,220,0.5)';
    ctx.font = font(f.sans, 24, 400);
    ctx.letterSpacing = '5px';
    ctx.fillText(k, x, 700);
    ctx.letterSpacing = '0px';
    ctx.fillStyle = CREAM;
    ctx.font = font(f.display, 120, 700);
    ctx.fillText(v, x, 840);
    x += 600;
  }
  ctx.fillStyle = 'rgba(243,233,220,0.35)';
  ctx.font = font(f.sans, 22, 400);
  ctx.letterSpacing = '4px';
  ctx.fillText('THE FIGURES ABOVE ARE THE EVENTS OF THIS DEMONSTRATION, ADDED UP.', 160, 1080);
  ctx.letterSpacing = '0px';
}

/** A dark card that lands on the laptop page: the confirmation, the RSVP. */
function drawLaptopCard(ctx: CanvasRenderingContext2D, f: Fonts, label: string, title: string, line: string, t: number) {
  if (t <= 0) return;
  const { w } = LAPTOP_PX;
  const cw = 880;
  const ch = 300;
  const x = w - cw - 120;
  const y = LAPTOP_PX.h - ch - 120 + (1 - t) * 60;
  ctx.save();
  ctx.globalAlpha = t;
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 20;
  ctx.fillStyle = SHEET;
  ctx.fillRect(x, y, cw, ch);
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = INK;
  ctx.font = font(f.sans, 24, 400);
  ctx.letterSpacing = '6px';
  ctx.fillText(label.toUpperCase(), x + 56, y + 80);
  ctx.letterSpacing = '0px';
  ctx.fillStyle = CREAM;
  ctx.font = font(f.display, 64, 700);
  ctx.fillText(title, x + 56, y + 170);
  ctx.fillStyle = 'rgba(243,233,220,0.8)';
  ctx.font = font(f.sans, 36, 400);
  ctx.fillText(line, x + 56, y + 236);
  ctx.restore();
}

/** The phone’s lock screen, with one message from the studio. */
function drawPhone(ctx: CanvasRenderingContext2D, f: Fonts, on: number, card: number) {
  const { w, h } = PHONE_PX;
  ctx.clearRect(0, 0, w, h);
  if (on <= 0) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    return;
  }
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#2a1b16');
  g.addColorStop(0.55, '#0f0a08');
  g.addColorStop(1, '#070504');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = on;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(243,233,220,0.8)';
  ctx.font = font(f.sans, 66, 400);
  ctx.fillText('Tuesday 21st', w / 2, 400);
  ctx.fillStyle = CREAM;
  ctx.font = font(f.display, 330, 700);
  ctx.fillText('18:05', w / 2, 720);
  ctx.textAlign = 'left';
  if (card > 0) {
    ctx.globalAlpha = on * card;
    const x = 60;
    const y = 900 + (1 - card) * 60;
    const cw = w - 120;
    const ch = 380;
    ctx.fillStyle = 'rgba(243,233,220,0.12)';
    roundRect(ctx, x, y, cw, ch, 66);
    ctx.fill();
    ctx.fillStyle = 'rgba(243,233,220,0.6)';
    ctx.font = font(f.sans, 40, 400);
    ctx.letterSpacing = '6px';
    ctx.fillText('WHATSAPP', x + 60, y + 90);
    ctx.letterSpacing = '0px';
    const tw = ctx.measureText('18:05').width;
    ctx.fillText('18:05', x + cw - 60 - tw - 20, y + 90);
    ctx.fillStyle = CREAM;
    ctx.font = font(f.sans, 52, 700);
    ctx.fillText('The studio', x + 60, y + 170);
    ctx.fillStyle = 'rgba(243,233,220,0.85)';
    ctx.font = font(f.sans, 46, 400);
    ctx.fillText('Hi Efua, it has been six weeks since your', x + 60, y + 245);
    ctx.fillText('last visit. Saturday at 11am is open if you', x + 60, y + 305);
    ctx.fillText('want it.', x + 60, y + 365);
  }
  ctx.globalAlpha = 1;
}

export interface Screens {
  laptop: THREE.CanvasTexture;
  phone: THREE.CanvasTexture;
  update: (state: ScreenState) => void;
  dispose: () => void;
}

export function createScreens(fonts: Fonts): Screens {
  const pages: Record<Exclude<LaptopScreen, 'off'>, HTMLCanvasElement> = {
    booking: canvas(LAPTOP_PX.w, LAPTOP_PX.h),
    rsvp: canvas(LAPTOP_PX.w, LAPTOP_PX.h),
    report: canvas(LAPTOP_PX.w, LAPTOP_PX.h),
  };
  drawBooking(ctxOf(pages.booking), fonts);
  drawRsvp(ctxOf(pages.rsvp), fonts);
  drawReport(ctxOf(pages.report), fonts);

  const laptopCanvas = canvas(LAPTOP_PX.w, LAPTOP_PX.h);
  const laptopCtx = ctxOf(laptopCanvas);
  const phoneCanvas = canvas(PHONE_PX.w, PHONE_PX.h);
  const phoneCtx = ctxOf(phoneCanvas);

  const laptop = new THREE.CanvasTexture(laptopCanvas);
  const phone = new THREE.CanvasTexture(phoneCanvas);
  for (const t of [laptop, phone]) {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
  }

  let last = '';

  const drawPage = (which: LaptopScreen, alpha: number) => {
    if (which === 'off' || alpha <= 0) return;
    laptopCtx.globalAlpha = alpha;
    laptopCtx.drawImage(pages[which], 0, 0);
    laptopCtx.globalAlpha = 1;
  };

  const update = (s: ScreenState) => {
    const key = `${s.laptop.from}|${s.laptop.to}|${s.laptop.t.toFixed(3)}|${s.laptop.card.toFixed(3)}|${s.phone.on.toFixed(3)}|${s.phone.card.toFixed(3)}`;
    if (key === last) return;
    last = key;

    laptopCtx.fillStyle = '#000000';
    laptopCtx.fillRect(0, 0, LAPTOP_PX.w, LAPTOP_PX.h);
    drawPage(s.laptop.from, 1 - s.laptop.t);
    drawPage(s.laptop.to, s.laptop.t);
    const shown = s.laptop.t >= 0.5 ? s.laptop.to : s.laptop.from;
    if (shown === 'booking') drawLaptopCard(laptopCtx, fonts, 'Booking confirmed', 'Saturday, 2:00 pm', 'General consultation · GHS 600 paid', s.laptop.card);
    if (shown === 'rsvp') drawLaptopCard(laptopCtx, fonts, 'RSVP received', 'Grand opening, 17 October', 'Counted. Nobody had to reply by hand.', s.laptop.card);
    laptop.needsUpdate = true;

    drawPhone(phoneCtx, fonts, s.phone.on, s.phone.card);
    phone.needsUpdate = true;
  };

  update({ laptop: { from: 'off', to: 'off', t: 0, card: 0 }, phone: { on: 0, card: 0 } });

  return {
    laptop,
    phone,
    update,
    dispose: () => {
      laptop.dispose();
      phone.dispose();
    },
  };
}
