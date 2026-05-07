import { cn } from "@/lib/utils";
import { Compass, PenTool, Code2, Lock, Rocket, Check } from "lucide-react";
import type React from "react";

interface StepCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({ index, icon, title, description, benefits }) => (
  <div className="relative flex flex-col h-full rounded-2xl border border-border bg-card/40 backdrop-blur p-8 transition-all duration-300 hover:border-accent/40 hover:bg-card/60 hover:-translate-y-1">
    <div className="absolute top-6 right-6 text-xs uppercase tracking-[0.25em] text-muted-foreground/60 font-mono">
      0{index}
    </div>
    <div className="h-14 w-14 rounded-xl border border-accent/30 bg-accent/5 grid place-items-center mb-6">
      <div className="text-accent">{icon}</div>
    </div>
    <h3 className="font-display text-2xl font-light mb-3 leading-tight">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
    <ul className="mt-auto space-y-2.5 pt-6 border-t border-border/50">
      {benefits.map((b) => (
        <li key={b} className="flex items-start gap-2.5 text-sm">
          <span className="mt-0.5 h-4 w-4 rounded-full bg-accent/15 grid place-items-center shrink-0">
            <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
          </span>
          <span className="text-foreground/80">{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

export const HowItWorks: React.FC<HowItWorksProps> = ({ className, ...props }) => {
  const steps: Omit<StepCardProps, "index">[] = [
    {
      icon: <Compass className="h-6 w-6" strokeWidth={1.5} />,
      title: "Discover",
      description: "We learn your brand, customers, and the impression you want to leave.",
      benefits: ["Strategy call and intake", "Goals and audience defined", "Scope and timeline mapped"],
    },
    {
      icon: <PenTool className="h-6 w-6" strokeWidth={1.5} />,
      title: "Design",
      description: "Custom mockups in your private portal. Review and approve in real time.",
      benefits: ["Bespoke visual direction", "Inline feedback and revisions", "Approve sections as you go"],
    },
    {
      icon: <Code2 className="h-6 w-6" strokeWidth={1.5} />,
      title: "Build",
      description: "Engineered for speed, SEO, and conversions on modern infrastructure.",
      benefits: ["Performance first code", "Responsive on every device", "SEO foundations baked in"],
    },
    {
      icon: <Lock className="h-6 w-6" strokeWidth={1.5} />,
      title: "Preview Hub",
      description: "Password-protected portal to preview, comment, and pay invoices.",
      benefits: ["Live previews any time", "Comments and approvals", "Secure invoicing built in"],
    },
    {
      icon: <Rocket className="h-6 w-6" strokeWidth={1.5} />,
      title: "Launch and Grow",
      description: "We handle hosting, domains, and ongoing care so you focus on customers.",
      benefits: ["Smooth launch coordination", "Hosting and domain managed", "Ongoing care included"],
    },
  ];

  return (
    <section
      className={cn(
        "py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-card/20 to-background",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <StepCard key={s.title} index={i + 1} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
};
