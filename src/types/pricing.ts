export interface ServicePricingPlan {
  name: 'Launch' | 'Scale' | 'Dominate';
  price: number | 'Custom'; // USD amount
  period: string;
  bestFor: string; // Service-specific description
  features: string[];
  cta: string;
  href: string;
  featured: boolean;
}

export interface ServicePricingConfig {
  serviceName: string;
  serviceSlug: string;
  sectionTitle: string;
  sectionSubtitle: string;
  plans: ServicePricingPlan[];
}
