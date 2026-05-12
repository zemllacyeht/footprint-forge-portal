import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";

const sections = [
  { href: "/services", label: "Services", desc: "What we design, build, and care for." },
  { href: "/process", label: "Process", desc: "How we run a project from kickoff to launch." },
  { href: "/pricing", label: "Pricing", desc: "Transparent packages and care plans." },
  { href: "/analyze", label: "Free Audit", desc: "Get an instant report on your current site." },
  { href: "/contact", label: "Contact", desc: "Tell us about your project." },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Error 404</div>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6">
              This page left no <span className="italic text-gradient-gold">footprint</span>.
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              We couldn't find what you were looking for. It may have moved or never existed. Try one of the sections below.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link href="/"><Home className="h-4 w-4" /> Back to home</Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link href="/contact">Talk to us <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="glass rounded-xl p-6 hover:border-accent/50 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-display text-lg">{s.label}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
