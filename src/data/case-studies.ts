// Case study copy rule: describe what the client gets and what happened, never how it is
// built. No vendor or tool names, no sequence counts or mechanics a competitor could copy.

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

export interface CaseStudyFaq {
  question: string;
  answer: string;
}

export interface CaseStudyEvent {
  name: string;
  /** ISO date of the most recent edition the figures describe. */
  startDate: string;
  location: string;
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
  /** The client's own website, when it has one, for structured data. */
  clientUrl?: string;
  /** Page title, before the site-wide " | Zera" suffix. */
  seoTitle: string;
  /** Meta description, kept under 160 characters. */
  seoDescription: string;
  /** ISO dates for structured data and the sitemap. */
  published: string;
  updated: string;
  headline: string;
  /** Opens the page and answers who, what and the result in plain sentences. */
  summary: string;
  keyFigure: CaseStudyFigure;
  challenge: string[];
  build: CaseStudyStep[];
  figuresTitle: string;
  figures: CaseStudyFigure[];
  figuresNote: string;
  hero: CaseStudyImage;
  gallery: CaseStudyImage[];
  faqs: CaseStudyFaq[];
  event?: CaseStudyEvent;
  keywords: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'gwen-addo',
    client: 'Gwen Addo',
    logo: { src: '/images/clients/gwen-addo.webp', width: 1060, height: 160, displayHeight: 26 },
    industry: 'Business Strategy',
    location: 'Accra, Ghana',
    year: '2026',
    status: 'Live',
    service: { name: 'The Retention Engine', href: '/products/market-monopoly' },
    liveUrl: {
      href: 'https://app.gwenaddo.com/masterclass-replay',
      label: 'app.gwenaddo.com',
    },
    clientUrl: 'https://gwenaddo.com',
    seoTitle: 'Gwen Addo: The Vision Masterclass System',
    seoDescription:
      'The system behind Gwen Addo’s Vision Masterclass in Accra: payments, QR check-in, follow-up and a paid replay. More than GHS 100,000 across three cohorts.',
    published: '2026-10-06',
    updated: '2026-10-06',
    headline: 'More than GHS 100,000 from one masterclass, with the follow-up running itself.',
    summary:
      'ZERA built and runs the system behind The Vision Masterclass, Gwen Addo’s one-day strategy programme for founders in Accra. It has run all three cohorts, from registration and payment to the door, the follow-up, alumni win-back and a paid replay of the sessions. Across the three cohorts it has collected more than GHS 100,000, more than GHS 60,000 of it from Cohort III.',
    keyFigure: { value: 'GHS 100,000+', label: 'Collected across three cohorts' },
    challenge: [
      'Gwen Addo is a business strategist, leadership coach and author, and the CEO of five businesses. Her Vision Masterclass brings founders into one room for a day of strategy, and every cohort is a serious revenue event for her business.',
      'Payments came in by card, mobile money and cash, and registrations, payments and past attendees each lived in a different place. Nothing connected a sign-up to a payment, a seat at the door, or the next thing that person might buy, and nothing brought past attendees, the people most likely to buy again, back into the room.',
    ],
    build: [
      {
        title: 'One record for every payment',
        body: 'Card, mobile money or cash, every payment lands in the same record, and every paid seat gets its own ticket.',
      },
      {
        title: 'Attendees hear from Gwen at the right moments',
        body: 'From sign-up to the morning of the event, every attendee knows what is coming and where to be, without anyone on the team sending a message by hand.',
      },
      {
        title: 'QR check-in at the door',
        body: 'Every ticket carries a QR code, so the team knows who has arrived while the event is still running.',
      },
      {
        title: 'Follow-up after the event',
        body: 'Attendees and no-shows hear different things after the day, and the people ready for more are moved toward working with Gwen one to one.',
      },
      {
        title: 'Past attendees brought back',
        body: 'Alumni of earlier cohorts are invited back for the next one. They already know the room, which makes them the people most likely to buy again.',
      },
      {
        title: 'The masterclass replay',
        body: 'The recorded sessions became a paid replay that only buyers can watch, offered to the people most likely to want it, so a one-day event keeps earning after the day.',
      },
      {
        title: 'Reporting',
        body: 'Gwen sees what the system brought in, cohort by cohort, without asking anyone for a report.',
      },
    ],
    figuresTitle: 'Cohort III in numbers',
    figures: [
      { value: 'GHS 60,000+', label: 'Net collected' },
      { value: '45', label: 'Paying attendees' },
      { value: 'GHS 14,000+', label: 'From 9 alumni who came back' },
      { value: 'Nearly 1,700', label: 'Emails sent automatically' },
      { value: '42 of 54', label: 'Seats checked in by QR' },
      { value: '70%', label: 'Of payments made after hours or on weekends' },
    ],
    figuresNote:
      'Figures for Cohort III, The Character Advantage, held on 22 August 2026. The system has run all three cohorts of The Vision Masterclass.',
    hero: {
      src: '/images/case-studies/gwen-addo/replay.webp',
      alt: 'The Character Advantage masterclass replay page on app.gwenaddo.com',
      width: 1600,
      height: 1000,
      caption: 'The paid masterclass replay.',
    },
    gallery: [
      {
        src: '/images/case-studies/gwen-addo/website.webp',
        alt: 'The new Gwen Addo website homepage',
        width: 1600,
        height: 1000,
        caption: 'The new gwenaddo.com.',
      },
    ],
    faqs: [
      {
        question: 'What did ZERA build for Gwen Addo?',
        answer:
          'The system behind The Vision Masterclass: registration and payment by card, mobile money or cash, attendee communication from sign-up to the day, QR check-in at the door, follow-up after the event, alumni win-back, a paid replay of the sessions, and reporting for Gwen.',
      },
      {
        question: 'How much did The Vision Masterclass collect?',
        answer:
          'More than GHS 100,000 across its three cohorts. Cohort III, The Character Advantage, held in Accra on 22 August 2026, collected more than GHS 60,000 net from 45 paying attendees. More than GHS 14,000 of it came from 9 alumni of earlier cohorts who came back.',
      },
      {
        question: 'How long has the system been running?',
        answer: 'It has run all three cohorts of The Vision Masterclass.',
      },
      {
        question: 'Why does automation matter for an event like this?',
        answer:
          '70% of Cohort III payments came in outside working hours, before 8am, after 9pm or at the weekend, and not one of them was missed.',
      },
      {
        question: 'Which ZERA service was this?',
        answer:
          'The Retention Engine, the tier of ZERA’s system built around bringing customers back after their first purchase.',
      },
    ],
    event: {
      name: 'The Vision Masterclass: The Character Advantage',
      startDate: '2026-08-22',
      location: 'Accra, Ghana',
    },
    keywords: [
      'Masterclass Registration System',
      'Event Payments Ghana',
      'QR Event Check-In',
      'Paid Event Replay',
      'Alumni Win-Back',
      'Event Follow-Up Automation',
    ],
  },
  {
    slug: 'allure-bloom',
    client: 'Allure Bloom',
    logo: { src: '/images/clients/allure-bloom.webp', width: 875, height: 160, displayHeight: 30 },
    industry: 'Luxury Beauty',
    location: 'Accra, Ghana',
    year: '2026',
    status: 'Live',
    service: { name: 'Branding & Design', href: '/solutions/branding-design' },
    liveUrl: { href: 'https://ab.zerahq.com', label: 'ab.zerahq.com' },
    seoTitle: 'Allure Bloom: Luxury Beauty Brand and Grand Opening',
    seoDescription:
      'Brand identity, a grand-opening RSVP system with door check-in, and a full print suite for Allure Bloom, a luxury beauty studio in Bawaleshie, Accra.',
    published: '2026-10-06',
    updated: '2026-10-06',
    headline: 'A luxury beauty studio, and a grand opening that knows exactly who is coming.',
    summary:
      'ZERA created Allure Bloom’s brand identity, a grand-opening RSVP system with check-in at the door, and the full print suite for the luxury beauty studio’s move to a larger space in Bawaleshie, Accra.',
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
        body: 'A grand-opening site where every guest replies once and is confirmed straight away, and the studio hears about each reply as it comes in.',
      },
      {
        title: 'Guest book and door list',
        body: 'A private guest list showing who is coming and who sent regrets, a printable door list, and check-in on the day.',
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
    figuresTitle: 'The engagement in numbers',
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
    faqs: [
      {
        question: 'What did ZERA do for Allure Bloom?',
        answer:
          'ZERA created the studio’s brand identity, a grand-opening RSVP system with check-in at the door, and the full print suite: an invitation box, the invitation suite, gift vouchers, a keepsake newspaper, a hiring flyer and a merchandise spec.',
      },
      {
        question: 'How do guests RSVP for the grand opening?',
        answer:
          'Every invitation carries a QR code to the grand-opening site. Each guest replies once and is confirmed straight away, and the studio sees its guest list fill up as replies come in.',
      },
      {
        question: 'Where is Allure Bloom?',
        answer:
          'Allure Bloom is a luxury beauty studio in Bawaleshie, Accra, offering lashes, nails, brows, spa, salon and makeup.',
      },
      {
        question: 'Which ZERA service was this?',
        answer: 'Branding & Design.',
      },
    ],
    keywords: [
      'Luxury Beauty Branding',
      'Beauty Studio Brand Identity',
      'Grand Opening RSVP System',
      'Luxury Print Design',
      'Brand Identity Accra',
    ],
  },
  {
    slug: 'finest-dietitian',
    client: 'Finest Dietitian',
    logo: { src: '/images/clients/finest-dietitian.webp', width: 430, height: 200, displayHeight: 44 },
    industry: 'Healthcare',
    location: 'Accra, Ghana',
    year: '2026',
    status: 'Live',
    service: { name: 'The Velocity System', href: '/products/growth-system' },
    liveUrl: { href: 'https://finestdietitian.com', label: 'finestdietitian.com' },
    clientUrl: 'https://finestdietitian.com',
    seoTitle: 'Finest Dietitian: Growing a Dietitian’s Practice',
    seoDescription:
      'How ZERA is growing Finest Dietitian, Fredericka Doku’s Accra practice: a website, on-site booking for 14 services, and a patient list of her own.',
    published: '2026-10-06',
    updated: '2026-10-06',
    headline: 'A dietitian’s following, turned into a patient list of her own.',
    summary:
      'Finest Dietitian is the practice of Fredericka Doku, a registered dietitian in Accra who works with PCOS, gut, metabolic and children’s nutrition. She is on The Velocity System, a six-month ZERA engagement to grow the practice. The website and on-site booking for her 14 services were the first part. The rest turns the audience she has built on social media into patients she can reach directly.',
    keyFigure: { value: '14', label: 'Services bookable on-site' },
    challenge: [
      'Fredericka Doku practises as Finest Dietitian and sees private patients at MediGrace Medical Centre in Accra. Her work covers PCOS, endometriosis, fibroids, menopause, gut and metabolic health, and children’s nutrition.',
      'She had a real following on Instagram and TikTok, but no list of her own. Patients reached her through messages, a link page and a third-party booking page, so every new patient started from scratch and nothing brought past patients back. Search engines and AI assistants had nothing authoritative to point to either.',
    ],
    build: [
      {
        title: 'The website',
        body: 'A homepage built around Fredericka, the conditions she treats, how a consultation works and stories from her clients, with an about page that sets out her credentials.',
      },
      {
        title: 'On-site booking',
        body: 'Every service with its price and length, live availability, no double bookings, and a private link for patients to manage their own appointment.',
      },
      {
        title: 'A patient list of her own',
        body: 'Booking on her site is the one action every page leads to, so each patient who books becomes someone she can reach again, instead of a conversation lost in her messages.',
      },
      {
        title: 'A free PCOS guide',
        body: 'For visitors who are not ready to book yet, sent only to people who confirm they want it, so someone who is not ready today is still on her list tomorrow.',
      },
      {
        title: 'BMI calculator',
        body: 'A dial-style calculator that answers a common first question and leads straight to booking.',
      },
      {
        title: 'Booking emails',
        body: 'Confirmation, cancellation and practice notices sent automatically, so the front desk stops typing the same message every day.',
      },
      {
        title: 'Found by search and AI assistants',
        body: 'Her practice, her credentials and the conditions she treats are described in a way Google and AI assistants can read, so they can name her when someone asks.',
      },
      {
        title: 'Growing the practice',
        body: 'With the site in place, the work turns to growth: moving her social following onto her own list, bringing past patients back, and turning happy patients into referrals, with a report on what it brings in.',
      },
    ],
    figuresTitle: 'The engagement in numbers',
    figures: [
      { value: '14', label: 'Services bookable on her own site' },
      { value: '1', label: 'Place every patient books, so every booking grows her list' },
      { value: '0', label: 'Third-party pages between a patient and a booking' },
      { value: '6', label: 'Months of growth work, starting with the site' },
    ],
    figuresNote:
      'The website is the first part of a six-month engagement. Results will be published as patients book through the site.',
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
    faqs: [
      {
        question: 'What did ZERA build for Finest Dietitian?',
        answer:
          'A six-month growth engagement on The Velocity System. The first part is a website built around Fredericka Doku and the conditions she treats, on-site booking for all 14 of her services, automatic booking emails, a free PCOS guide and a BMI calculator. The rest grows her practice from there.',
      },
      {
        question: 'Is the Finest Dietitian project just a website?',
        answer:
          'No. The website is the first part. The engagement is built to turn the following Fredericka has on social media into a patient list of her own, then bring past patients back and turn happy patients into referrals.',
      },
      {
        question: 'Can patients book Finest Dietitian online?',
        answer:
          'Yes. Patients choose a service on finestdietitian.com, see its price and length, pick an available time, and get a private link to manage the appointment themselves.',
      },
      {
        question: 'Who is Finest Dietitian?',
        answer:
          'Finest Dietitian is the practice of Fredericka Doku, a registered dietitian who sees private patients at MediGrace Medical Centre in Accra. She works with PCOS, endometriosis, fibroids, menopause, gut and metabolic health, and children’s nutrition.',
      },
      {
        question: 'Which ZERA service was this?',
        answer:
          'The Velocity System, the tier of ZERA’s system built around turning attention into bookings automatically, run over six months.',
      },
    ],
    keywords: [
      'Dietitian Website',
      'Patient Acquisition',
      'Healthcare Lead Generation Ghana',
      'Healthcare Website Ghana',
      'Online Booking System',
      'Dietitian Accra',
      'Medical Practice Website',
    ],
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
