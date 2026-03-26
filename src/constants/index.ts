import { NavItem, Service, Doctor, Review, FAQ } from "../types";
import servicesData from "../data/services.json";
import teamData from "../data/team.json";
import reviewsData from "../data/reviews.json";
import faqsData from "../data/faqs.json";

export const CLINIC_INFO = {
  name: "Dentiq",
  phone: "+90 (555) 123 45 67",
  email: "merhaba@dentiq.com",
  address: "Nişantaşı, Valikonağı Cd. No:1, Şişli/İstanbul",
  workingHours: "Pzt - Cmt: 09:00 - 19:00",
  googleRating: "5.0",
  reviewCount: "500+",
  experienceYears: "15+"
};

export const NAV_LINKS: NavItem[] = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Klinik", href: "#klinik" },
  { label: "Hekimler", href: "#hekimler" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "İletişim", href: "#iletisim" },
];

export const SERVICES: Service[] = servicesData as Service[];
export const TEAM: Doctor[] = teamData as Doctor[];
export const TESTIMONIALS: Review[] = reviewsData as Review[];
export const FAQS: FAQ[] = faqsData as FAQ[];

