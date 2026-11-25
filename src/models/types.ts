// Shape of one landing page model. Every model is made-up sample content for the prototype.

export type Field = 'name' | 'email' | 'phone';
export type Visual = 'phone' | 'course' | 'property' | 'sale' | 'ticket';

export interface Theme {
  /** RGB triplets, e.g. "109 74 255" */
  brand: string;
  brandDark: string;
  brandSoft: string;
  accent: string;
  accentDark: string;
  accentInk: string;
  paper: string;
  line: string;
}

export interface Plan {
  name: string;
  price: string;
  /** Shown instead of `price` when the yearly toggle is on. */
  yearlyPrice?: string;
  period?: string;
  note?: string;
  yearlyNote?: string;
  blurb: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface Model {
  slug: string;
  /** Kind of business, e.g. "Coaching course" */
  kind: string;
  /** Who would order a page like this */
  usedBy: string;
  /** What the page is built to get visitors to do */
  goal: string;
  name: string;
  logoIcon: string;
  theme: Theme;
  nav: { features: string; steps: string; pricing: string };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    text: string;
    visual: Visual;
  };
  countdown?: { label: string; days: number };
  form: {
    fields: Field[];
    button: string;
    success: string;
    note: string;
    proofBase: number;
    proofText: string;
  };
  stats: { value: string; label: string }[];
  features: { eyebrow: string; title: string; text: string; items: { icon: string; title: string; text: string }[] };
  steps: { title: string; items: { title: string; text: string }[] };
  pricing: { eyebrow: string; title: string; text: string; plans: Plan[] };
  testimonials: { title: string; items: { name: string; role: string; text: string }[] };
  faqs: { q: string; a: string }[];
  final: { title: string; text: string };
  whatsapp: string;
}
