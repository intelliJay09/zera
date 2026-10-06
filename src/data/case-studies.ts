export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface CaseStudyLogo {
  src: string;
  width: number;
  height: number;
  /** Optical display height in px, so wordmarks and stacked marks read at the same weight. */
  displayHeight: number;
}

export interface CaseStudyFigure {
  value: string;
  label: string;
}

export interface CaseStudyStep {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  logo: CaseStudyLogo;
  industry: string;
  location: string;
  year: string;
  status: string;
  service: {
    name: string;
    href: string;
  };
  liveUrl: {
    href: string;
    label: string;
  };
  headline: string;
  summary: string;
  keyFigure: CaseStudyFigure;
  challenge: string[];
  build: CaseStudyStep[];
  figuresTitle: string;
  figures: CaseStudyFigure[];
  figuresNote: string;
  hero: CaseStudyImage;
  gallery: CaseStudyImage[];
  keywords: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'gwen-addo',
    client: 'Gwen Addo',
    logo: { src: '/images/clients/gwen-addo.webp', width: 1060, height: 160, displayHeight: 26 },
    industry: 'Business Education',
    location: 'Accra, Ghana',
    year: '2026',
    status: 'Live',
    service: { name: 'The Retention Engine', href: '/products/market-monopoly' },
    liveUrl: {
      href: 'https://app.gwenaddo.com/masterclass-replay',
      label: 'app.gwenaddo.com',
    },
    headline: 'GHS 67,400 collected from one masterclass, with the follow-up running itself.',
    summary:
      'We built the system behind The Vision Masterclass: sign-up, payment, reminders, QR check-in, post-event follow-up and alumni win-back, all running without anyone chasing.',
    keyFigure: { value: 'GHS 67,400', label: 'Net collected, Cohort 3' },
    challenge: [
      'Gwen Addo is a business strategist and the founder of five companies. Her Vision Masterclass brings founders into one room for a day of strategy, and each cohort is a serious revenue event for her business.',
      'Payments arrived by card, mobile money and cash. Registrations sat in Airtable and past attendees in a spreadsheet. Nothing connected a sign-up to a payment, a seat at the door, or the next thing that person might buy, and there was no system to bring past attendees, the people most likely to buy again, back into the room.',
    ],
    build: [
      {
        title: 'Sign-up to seat',
        body: 'Paystack checkout with individual and group packages, plus a payment entry desk for mobile money and cash, so every cedi lands in one record. Each paid seat gets a ticket with its own QR code.',
      },
      {
        title: 'Nurture and reminders',
        body: 'A daily nurture sequence, a three-part speaker reveal, and countdown, day-before and event-morning emails that tell every attendee exactly where to be.',
      },
      {
        title: 'The door',
        body: 'A PIN-secured QR check-in desk, so the team knows who arrived and who did not, while the event is still running.',
      },
      {
        title: 'After the event',
        body: 'Materials, recaps, no-show follow-up and a strategy session application pipeline, sent automatically to the right people at the right time.',
      },
      {
        title: 'Alumni win-back',
        body: 'A five-email campaign that brought past cohorts back into the room, built on a clean record of who had attended before.',
      },
      {
        title: 'Paid replay and reporting',
        body: 'A protected replay with watermarked video and magic-link access, and a weekly digest that shows Gwen what the system collected.',
      },
    ],
    figuresTitle: 'Cohort 3 in numbers',
    figures: [
      { value: 'GHS 67,400', label: 'Net collected' },
      { value: '45', label: 'Paying attendees' },
      { value: 'GHS 14,050', label: 'From 9 alumni won back' },
      { value: '1,695', label: 'Automated emails to 194 people' },
      { value: '42 of 54', label: 'Seats checked in by QR' },
      { value: '70%', label: 'Of payments made after hours or on weekends' },
    ],
    figuresNote:
      'Production data for Cohort 3, The Character Advantage, held on 22 August 2026.',
    hero: {
      src: '/images/case-studies/gwen-addo/replay.webp',
      alt: 'The Character Advantage masterclass replay page on app.gwenaddo.com',
      width: 1600,
      height: 1000,
      caption: 'The paid masterclass replay, with protected video and magic-link access.',
    },
    gallery: [
      {
        src: '/images/case-studies/gwen-addo/website.webp',
        alt: 'The new Gwen Addo website homepage',
        width: 1600,
        height: 1000,
        caption: 'The new gwenaddo.com, rebuilt from WordPress.',
      },
    ],
    keywords: ['Masterclass Funnel', 'Event Automation', 'Customer Win-Back', 'Lifecycle Email'],
  },
  {
    slug: 'allure-bloom',
    client: 'Allure Bloom',
    logo: { src: '/images/clients/allure-bloom.webp', width: 875, height: 160, displayHeight: 30 },
    industry: 'Luxury Beauty',
    location: 'Accra, Ghana',
    year: '2026',
    status: 'Opening 17 October 2026',
    service: { name: 'Branding & Design', href: '/solutions/branding-design' },
    liveUrl: { href: 'https://ab.zerahq.com', label: 'ab.zerahq.com' },
    headline: 'A luxury beauty studio, and a grand opening that knows exactly who is coming.',
    summary:
      'Brand identity, a grand-opening RSVP system with door check-in, and a full print suite for Allure Bloom’s move to a larger studio in Bawaleshie.',
    keyFigure: { value: '9', label: 'Services under one brand' },
    challenge: [
      'Allure Bloom is an established luxury beauty studio in Accra, with lashes, nails, brows, spa, salon and makeup under one roof.',
      'Moving to a larger studio in Bawaleshie with new services, it needed a brand that holds up from a voucher to a storefront, and an opening that feels as considered as its treatments. It also needed to know who was coming, without a phone full of replies to count by hand.',
    ],
    build: [
      {
        title: 'Brand identity',
        body: 'Wordmark, bloom mark and combination marks, an espresso and cream palette, and usage guidelines that keep every supplier on brand.',
      },
      {
        title: 'RSVP system',
        body: 'A grand-opening site that takes one reply per phone number, confirms guests by email with a calendar file, and alerts the studio to every reply.',
      },
      {
        title: 'Guest book and door list',
        body: 'A private dashboard with attending, regrets, a printable door list and check-in on the day.',
      },
      {
        title: 'Invitation box',
        body: 'A rigid, book-style box with a beige matte foil seal struck into a debossed well, designed to be kept.',
      },
      {
        title: 'Invitation suite',
        body: 'An A5 invitation with a foiled logo and a QR code to the RSVP site, plus a personalised envelope, founder’s letter and details card.',
      },
      {
        title: 'Print and merchandise',
        body: 'Gift vouchers in four values, a keepsake newspaper, a hiring flyer and a merchandise spec for suppliers.',
      },
    ],
    figuresTitle: 'The engagement',
    figures: [
      { value: '9', label: 'Services under one brand' },
      { value: '6', label: 'Print pieces designed for the launch' },
      { value: '4', label: 'Gift voucher values, GHS 500 to 2,000' },
      { value: '1', label: 'Reply per guest, so the list stays clean' },
    ],
    figuresNote: 'The grand opening is on 17 October 2026. Results will be published after the event.',
    hero: {
      src: '/images/case-studies/allure-bloom/invitation.webp',
      alt: 'Allure Bloom grand opening invitation, front and back',
      width: 1600,
      height: 920,
      caption: 'The general invitation, with the logo in beige matte foil on espresso.',
    },
    gallery: [
      {
        src: '/images/case-studies/allure-bloom/box.webp',
        alt: 'Allure Bloom invitation box, open, with a foil seal inside the lid',
        width: 1600,
        height: 1768,
        caption: 'The invitation box, seal direction.',
      },
      {
        src: '/images/case-studies/allure-bloom/rsvp.webp',
        alt: 'Allure Bloom grand opening RSVP website',
        width: 1600,
        height: 1420,
        caption: 'The RSVP site at ab.zerahq.com.',
      },
      {
        src: '/images/case-studies/allure-bloom/voucher.webp',
        alt: 'Allure Bloom gift voucher, open and closed',
        width: 1600,
        height: 884,
        caption: 'The folded gift voucher.',
      },
    ],
    keywords: ['Brand Identity', 'Event RSVP System', 'Luxury Print Design', 'Beauty Studio Branding'],
  },
  {
    slug: 'finest-dietitian',
    client: 'Finest Dietitian',
    logo: { src: '/images/clients/finest-dietitian.webp', width: 430, height: 200, displayHeight: 44 },
    industry: 'Healthcare',
    location: 'Accra, Ghana',
    year: '2026',
    status: 'Launching',
    service: { name: 'The Digital HQ', href: '/products/digital-hq' },
    liveUrl: { href: 'https://finestdietitian.com', label: 'finestdietitian.com' },
    headline: 'A dietitian’s practice, moved off third-party pages and onto a site she owns.',
    summary:
      'A new website and on-site booking system for Fredericka Doku, a registered dietitian in Accra working with PCOS, gut, metabolic and children’s nutrition.',
    keyFigure: { value: '14', label: 'Services bookable on-site' },
    challenge: [
      'Fredericka Doku practises as Finest Dietitian and sees private patients at MediGrace Medical Centre in Accra. Her work covers PCOS, endometriosis, fibroids, menopause, gut and metabolic health, and children’s nutrition.',
      'Her practice lived on a Linktree and a third-party booking page. Patients had no single place to understand her work or her credentials, and search engines and AI assistants had nothing authoritative to point to.',
    ],
    build: [
      {
        title: 'The website',
        body: 'A homepage built around Fredericka, the conditions she treats, how a consultation works and stories from her clients, with an about page that sets out her credentials.',
      },
      {
        title: 'On-site booking',
        body: 'Every service with its price and length, an availability engine, database-level protection against double booking, and a private link for patients to manage their appointment.',
      },
      {
        title: 'Booking emails',
        body: 'Confirmation, cancellation and practice notices sent automatically, so the front desk stops typing the same message every day.',
      },
      {
        title: 'Search and answer engines',
        body: 'Structured data describing the clinic, the practitioner and her credentials, so Google and AI assistants can name her when someone asks.',
      },
      {
        title: 'Lead capture',
        body: 'A double opt-in signup for a PCOS guide, with consent stored, for patients who are not ready to book yet.',
      },
      {
        title: 'BMI calculator',
        body: 'A dial-style calculator that answers a common first question and leads straight to booking.',
      },
    ],
    figuresTitle: 'The engagement',
    figures: [
      { value: '14', label: 'Services bookable on her own site' },
      { value: '0', label: 'Third-party pages between a patient and a booking' },
      { value: '1', label: 'Home for her credentials, services and client stories' },
    ],
    figuresNote: 'The site is in final review ahead of launch. Results will be published once it is live.',
    hero: {
      src: '/images/case-studies/finest-dietitian/home.webp',
      alt: 'Finest Dietitian homepage featuring Fredericka Doku',
      width: 1600,
      height: 1000,
      caption: 'The homepage.',
    },
    gallery: [
      {
        src: '/images/case-studies/finest-dietitian/booking.webp',
        alt: 'Finest Dietitian on-site booking page listing services and prices',
        width: 1600,
        height: 1000,
        caption: 'On-site booking, with every service, price and length.',
      },
      {
        src: '/images/case-studies/finest-dietitian/bmi.webp',
        alt: 'Finest Dietitian dial-style BMI calculator',
        width: 1600,
        height: 1000,
        caption: 'The BMI calculator.',
      },
    ],
    keywords: ['Healthcare Website', 'Online Booking System', 'Dietitian Website', 'Medical Structured Data'],
  },
];

/**
 * Explicit pixel size for a logo at a given height, derived from its intrinsic
 * aspect ratio, so logos never depend on CSS to keep their proportions.
 */
export function logoSize(logo: { width: number; height: number }, displayHeight: number) {
  return {
    width: Math.round((displayHeight * logo.width) / logo.height),
    height: Math.round(displayHeight),
  };
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
