export type PortfolioCategory = 'waas' | 'custom-web-app' | 'branding' | 'ecommerce';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: PortfolioCategory;
  tags: string[];
  results: string[];
  image: string;
  href: string;
  featured: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  // Featured Custom Web App
  {
    id: 'techflow',
    title: 'From Regional to National: A Growth Story',
    client: 'TechFlow Solutions',
    industry: 'B2B SaaS',
    category: 'custom-web-app',
    tags: ['Custom Web App', 'Lead Generation', 'Digital Strategy'],
    results: ['320% increase in qualified leads', '4.8x ROI in 6 months', 'Market expansion to 3 new regions'],
    image: '/images/case-study-hero.jpg',
    href: '/case-studies/techflow-solutions',
    featured: true,
  },

  // Custom Web Apps
  {
    id: 'luxe-wellness',
    title: 'E-commerce Transformation',
    client: 'Luxe Wellness',
    industry: 'Wellness & Beauty',
    category: 'ecommerce',
    tags: ['E-commerce Platform', 'Customer Retention', 'UX Design'],
    results: ['210% revenue growth', '65% increase in customer lifetime value'],
    image: '/images/case-study-2.jpg',
    href: '/case-studies/luxe-wellness',
    featured: false,
  },
  {
    id: 'meridian-financial',
    title: 'Digital-First Rebranding',
    client: 'Meridian Financial',
    industry: 'Financial Services',
    category: 'branding',
    tags: ['Branding', 'Web Development', 'SEO Strategy'],
    results: ['500% increase in organic traffic', '92% brand recognition improvement'],
    image: '/images/case-study-3.jpg',
    href: '/case-studies/meridian-financial',
    featured: false,
  },
  {
    id: 'apex-manufacturing',
    title: 'Market Leadership Acceleration',
    client: 'Apex Manufacturing',
    industry: 'Industrial B2B',
    category: 'custom-web-app',
    tags: ['Custom Web App', 'Lead Generation', 'Content Marketing'],
    results: ['180% increase in enterprise deals', 'Category leader positioning achieved'],
    image: '/images/case-study-4.jpg',
    href: '/case-studies/apex-manufacturing',
    featured: false,
  },

  // WaaS Projects
  {
    id: 'artisan-cafe',
    title: 'Quick Launch for Local Business',
    client: 'Artisan Cafe',
    industry: 'Food & Beverage',
    category: 'waas',
    tags: ['WaaS Starter', 'Quick Deploy', 'Local SEO'],
    results: ['Live in 7 days', '40% increase in online orders', '250+ new email subscribers'],
    image: '/images/case-study-waas-1.jpg',
    href: '/case-studies/artisan-cafe',
    featured: false,
  },
  {
    id: 'bloom-wellness',
    title: 'Spa Launch & Growth',
    client: 'Bloom Wellness Spa',
    industry: 'Wellness',
    category: 'waas',
    tags: ['WaaS Growth', 'Booking Integration', 'Local Marketing'],
    results: ['200+ bookings in first month', '4.9-star rating average', 'Fully booked weekends'],
    image: '/images/case-study-waas-2.jpg',
    href: '/case-studies/bloom-wellness',
    featured: false,
  },
  {
    id: 'summit-consulting',
    title: 'Professional Services Online Presence',
    client: 'Summit Consulting Group',
    industry: 'Professional Services',
    category: 'waas',
    tags: ['WaaS Pro', 'Lead Generation', 'Content Hub'],
    results: ['150% increase in consultation requests', 'Thought leadership positioning', 'Industry award recognition'],
    image: '/images/case-study-waas-3.jpg',
    href: '/case-studies/summit-consulting',
    featured: false,
  },

  // Branding Projects
  {
    id: 'verde-organics',
    title: 'Sustainable Brand Identity',
    client: 'Verde Organics',
    industry: 'Sustainable Products',
    category: 'branding',
    tags: ['Brand Strategy', 'Visual Identity', 'Packaging Design'],
    results: ['300% social media growth', 'Retail expansion to 50+ stores', 'Featured in major publications'],
    image: '/images/case-study-branding-1.jpg',
    href: '/case-studies/verde-organics',
    featured: false,
  },

  // E-commerce Projects
  {
    id: 'modern-threads',
    title: 'Fashion E-commerce Scale-Up',
    client: 'Modern Threads',
    industry: 'Fashion Retail',
    category: 'ecommerce',
    tags: ['Custom E-commerce', 'Inventory Management', 'Marketing Automation'],
    results: ['$2M in first-year revenue', '50,000+ customers acquired', '35% repeat purchase rate'],
    image: '/images/case-study-ecommerce-1.jpg',
    href: '/case-studies/modern-threads',
    featured: false,
  },
];

export function getProjectsByCategory(category: PortfolioCategory): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.category === category);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.featured === true);
}

export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.id === id);
}

export const PORTFOLIO_CATEGORIES: { value: PortfolioCategory; label: string }[] = [
  { value: 'waas', label: 'WaaS' },
  { value: 'custom-web-app', label: 'Custom Web Apps' },
  { value: 'branding', label: 'Branding' },
  { value: 'ecommerce', label: 'E-commerce' },
];
