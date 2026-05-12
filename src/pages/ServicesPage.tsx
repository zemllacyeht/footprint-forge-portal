import { PageLayout } from "@/components/site/PageLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { ServiceCarousel, type Service } from "@/components/ui/services-card";
import {
  Palette,
  Code2,
  Globe,
  LineChart,
  Shield,
  Smartphone,
  Megaphone,
  Camera,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services: Service[] = [
  {
    number: "001",
    tag: "Brand",
    title: "Brand Identity",
    description: "Logos, color, and visual systems that make you unmistakable.",
    icon: Palette,
    details: [
      "Primary and secondary logo lockups",
      "Color, typography, and spacing tokens",
      "Brand guidelines PDF for your team",
      "Social avatars and favicons included",
    ],
  },
  {
    number: "002",
    tag: "Brand",
    title: "Content & Photography",
    description: "Original photo, video, and copy written for your business.",
    icon: Camera,
    details: [
      "On-location product and team photos",
      "Short-form video for social",
      "Copywriting for web and email",
      "Edited, color-graded, ready to ship",
    ],
  },
  {
    number: "003",
    tag: "Brand",
    title: "Email & Automation",
    description: "Branded campaigns and automations that turn one-time visitors into repeat customers.",
    icon: Mail,
    details: [
      "Welcome and onboarding sequences",
      "Branded transactional templates",
      "Abandoned cart and re-engagement flows",
      "Integrated with your CRM",
    ],
  },
  {
    number: "004",
    tag: "Build",
    title: "Custom Web Design",
    description: "Hand-crafted, conversion-focused websites built around your goals.",
    icon: Code2,
    details: [
      "Bespoke layouts, never templates",
      "Built in React with modern tooling",
      "Conversion-focused page structures",
      "Accessibility and performance baked in",
    ],
  },
  {
    number: "005",
    tag: "Build",
    title: "Responsive Builds",
    description: "Looks right on every screen, from phones to widescreen monitors.",
    icon: Smartphone,
    details: [
      "Mobile-first design approach",
      "Tested across iOS, Android, and desktop",
      "Touch-friendly navigation",
      "Optimized images for every screen",
    ],
  },
  {
    number: "006",
    tag: "Build",
    title: "Domain & Hosting",
    description: "Domains, SSL, hosting, and uptime monitoring, fully managed.",
    icon: Globe,
    details: [
      "Domain purchase and DNS setup",
      "Free SSL certificates included",
      "Global CDN for fast load times",
      "24/7 uptime monitoring",
    ],
  },
  {
    number: "007",
    tag: "Grow",
    title: "SEO Foundations",
    description: "Search optimization built in, so the customers looking for you can find you.",
    icon: LineChart,
    details: [
      "Keyword research for your niche",
      "On-page SEO and meta tags",
      "Structured data and sitemaps",
      "Google Search Console setup",
    ],
  },
  {
    number: "008",
    tag: "Grow",
    title: "Marketing Collateral",
    description: "Social graphics, email banners, ads, and print pieces, always on-brand.",
    icon: Megaphone,
    details: [
      "Social media templates",
      "Paid ad creative for Meta and Google",
      "Email headers and signatures",
      "Print-ready business cards and flyers",
    ],
  },
  {
    number: "009",
    tag: "Grow",
    title: "Ongoing Care",
    description: "Updates, security patches, and content edits, handled every month.",
    icon: Shield,
    details: [
      "Monthly security and dependency updates",
      "Content edits and small tweaks included",
      "Performance and uptime reports",
      "Priority support response times",
    ],
  },
];

const ServicesPage = () => {
  return (
    <PageLayout
      title="Services · Build Your Footprint"
      description="Custom web design, brand identity, hosting, SEO, and ongoing care: everything you need to launch and maintain a digital footprint that grows with your business."
    >
      <PageHeader
        eyebrow="Services"
        breadcrumb="Services"
        title={<>A full studio, <span className="italic text-gradient-gold">under one roof</span>.</>}
        description="Brand. Build. Grow. Three disciplines, nine connected services. Everything your business needs to come online, stay online, and bring in customers."
      />

      <section id="services" className="pb-24 md:pb-32 relative">
        <div className="container">
          <ServiceCarousel services={services} />
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container">
          <div className="max-w-4xl mx-auto glass rounded-2xl p-10 md:p-14 text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Next step</div>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-6">
              See how we deliver these services, <span className="italic text-gradient-gold">step by step</span>.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our process turns scope into a launched site without surprises, with full transparency through your private client portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/process">View our process <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;
