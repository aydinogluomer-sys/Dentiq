export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  image?: string;
  slug: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  bio?: string;
  education?: string[];
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  text: string;
  date?: string;
  source?: 'Google' | 'Facebook' | 'Website';
  treatment?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Keeping old interfaces for backward compatibility until all components are updated
export interface ServiceItem extends Service {}
export interface TeamMember extends Doctor {}
export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  quote: string;
  rating: number;
}
export interface FaqItem {
  question: string;
  answer: string;
}
