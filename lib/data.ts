import {
  Smartphone,
  Globe2,
  Cloud,
  Sparkles,
  ShieldCheck,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  /** grid span classes for the bento layout */
  span: string;
  color: string;
}

export const services: Service[] = [
  {
    icon: Globe2,
    title: "Web Applications",
    description:
      "High-performance web apps built on modern frameworks — from dashboards to full customer-facing platforms.",
    span: "lg:col-span-2 lg:row-span-2",
    color: "text-primary",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native-feel iOS & Android apps from a single codebase.",
    span: "lg:col-span-1 lg:row-span-1",
    color: "text-secondary",
  },
  {
    icon: Layers,
    title: "SaaS Platforms",
    description: "Multi-tenant products engineered to scale from day one.",
    span: "lg:col-span-1 lg:row-span-1",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "AI Integrations",
    description: "LLM-powered features, agents, and internal tooling.",
    span: "lg:col-span-1 lg:row-span-1",
    color: "text-primary",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "CI/CD, infra-as-code, and zero-downtime deploys.",
    span: "lg:col-span-1 lg:row-span-1",
    color: "text-secondary",
  },
  {
    icon: ShieldCheck,
    title: "Product & UI/UX",
    description:
      "Interfaces designed for conversion, tested with real users, shipped fast.",
    span: "lg:col-span-2 lg:row-span-1",
    color: "text-accent",
  },
];

export interface TechItem {
  name: string;
  ring: 1 | 2 | 3;
}

export const techStack: TechItem[] = [
  { name: "React", ring: 1 },
  { name: "Next.js", ring: 1 },
  { name: "TypeScript", ring: 1 },
  { name: "Node.js", ring: 2 },
  { name: "PostgreSQL", ring: 2 },
  { name: "GraphQL", ring: 2 },
  { name: "AWS", ring: 3 },
  { name: "Docker", ring: 3 },
  { name: "React Native", ring: 3 },
  { name: "Tailwind", ring: 1 },
  { name: "Redis", ring: 2 },
  { name: "Kubernetes", ring: 3 },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We dig into your business goals, users, and constraints to scope the right product — not just any product.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes to high-fidelity UI, validated with you before a single line of production code is written.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Agile sprints with weekly demos. You watch the product take shape in real time, not at the finish line.",
  },
  {
    step: "04",
    title: "Testing",
    description:
      "Automated test suites, manual QA, and performance audits before anything reaches production.",
  },
  {
    step: "05",
    title: "Launch",
    description: "Zero-downtime deployment, monitoring, and rollback plans in place from day one.",
  },
  {
    step: "06",
    title: "Support",
    description:
      "Post-launch iteration, scaling support, and a direct line to the team that built it.",
  },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "orbitpay",
    title: "OrbitPay",
    category: "SaaS / Fintech",
    description: "A multi-tenant billing and invoicing platform processing 6-figure monthly volume.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    slug: "fielddesk",
    title: "FieldDesk",
    category: "Mobile",
    description: "Offline-first field service app for technicians, syncing across 400+ devices.",
    tags: ["React Native", "GraphQL"],
  },
  {
    slug: "loop-crm",
    title: "Loop CRM",
    category: "Web Application",
    description: "A custom CRM replacing three disconnected tools for a 60-person sales org.",
    tags: ["React", "Node.js", "Redis"],
  },
  {
    slug: "aviato-ai",
    title: "Aviato AI",
    category: "AI / SaaS",
    description: "An AI copilot embedded into an existing product, cutting support tickets by 40%.",
    tags: ["LLM", "Vector Search", "Next.js"],
  },
  {
    slug: "northline",
    title: "Northline",
    category: "Web Application",
    description: "Logistics dashboard visualizing live fleet data across 12 regional hubs.",
    tags: ["TypeScript", "WebSockets"],
  },
  {
    slug: "pulseboard",
    title: "Pulseboard",
    category: "SaaS",
    description: "Analytics platform for e-commerce brands, from schema to shipped dashboard in 9 weeks.",
    tags: ["Next.js", "AWS", "Docker"],
  },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rahul Menon",
    role: "Founder",
    company: "OrbitPay",
    quote:
      "Infinity dot didn't just build what we asked for — they questioned our assumptions and the product is better for it.",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    company: "FieldDesk",
    quote: "Every sprint shipped exactly what was demoed. No surprises, no scope creep, no excuses.",
  },
  {
    name: "Daniel Osei",
    role: "CTO",
    company: "Loop CRM",
    quote: "The kind of engineering partner you stop thinking of as a vendor and start thinking of as a team.",
  },
];

export const stats = [
  { value: "40+", label: "Products Shipped" },
  { value: "99.99%", label: "Uptime Guaranteed" },
  { value: "12", label: "Countries Served" },
  { value: "6wk", label: "Avg. MVP Timeline" },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-mvps-in-six-weeks",
    title: "How We Ship MVPs in Six Weeks, Not Six Months",
    excerpt: "A look at the process we use to take a product from idea to first users fast, without cutting corners on architecture.",
    date: "2026-06-12",
    category: "Process",
  },
  {
    slug: "choosing-a-stack-that-scales",
    title: "Choosing a Stack That Scales With You, Not Against You",
    excerpt: "Why we default to boring, proven infrastructure for the parts that must never break — and where we take risks.",
    date: "2026-05-28",
    category: "Engineering",
  },
  {
    slug: "ai-features-that-earn-their-keep",
    title: "AI Features That Earn Their Keep",
    excerpt: "Most bolted-on AI features get ignored. Here's how we decide which ones are actually worth building.",
    date: "2026-05-09",
    category: "Product",
  },
];
