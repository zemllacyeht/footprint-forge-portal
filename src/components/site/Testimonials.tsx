import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The client portal completely changed how we approve work. Logging in to see live previews, leaving comments right on the page, and approving in one click made the whole launch feel effortless.",
    name: "Marcus Reyes",
    role: "Founder",
    company: "Reyes Coffee Roasters",
    initials: "MR",
    accent: "primary" as const,
  },
  {
    quote:
      "Our brand looks unrecognizable from a year ago lol. But in the best way. The monthly marketing support keep our socials and emails sharp without us lifting a finger.",
    name: "Priya Anand",
    role: "Operations Director",
    company: "Northwood Dental",
    initials: "PA",
    accent: "accent" as const,
    featured: true,
  },
  {
    quote:
      "Our brand looks unrecognizable from a year ago — in the best way. The monthly marketing drops keep our socials and emails sharp without us lifting a finger.",
    name: "Jordan Belfield",
    role: "Owner",
    company: "Atlas Athletic Co.",
    initials: "JB",
    accent: "primary" as const,
  },
];

const stats = [
  { v: "98%", l: "Client retention" },
  { v: "24h", l: "Avg. response time" },
  { v: "5★", l: "Across the board" },
  { v: "0", l: "Surprise invoices" },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <div className="container">
        <div className="max-w-2xl mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
            What clients say
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light leading-tight">
            Trusted by businesses who{" "}
            <span className="italic text-gradient-gold">stay for years</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                t.featured
                  ? "bg-gradient-to-b from-primary/10 to-card border-2 border-primary/40 shadow-elegant lg:scale-[1.03] lg:-translate-y-2"
                  : "glass"
              }`}
            >
              <Quote
                className={`h-8 w-8 mb-6 ${
                  t.accent === "accent" ? "text-accent" : "text-primary"
                }`}
                strokeWidth={1.5}
              />

              <blockquote className="text-foreground/90 leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div
                  className={`h-11 w-11 rounded-full grid place-items-center font-display font-medium text-sm shrink-0 ${
                    t.accent === "accent"
                      ? "bg-gradient-gold text-accent-foreground shadow-gold"
                      : "bg-gradient-primary text-primary-foreground shadow-glow"
                  }`}
                >
                  {t.initials}
                </div>
                <figcaption className="min-w-0">
                  <div className="font-medium truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {t.role} · {t.company}
                  </div>
                </figcaption>
                <div className="flex gap-0.5 ml-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-accent text-accent"
                    />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>

        {/* Trust stats */}
        <div className="glass rounded-2xl border border-border/50 grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50 overflow-hidden">
          {stats.map((s) => (
            <div key={s.l} className="p-8 text-center">
              <div className="font-display text-4xl md:text-5xl font-light text-gradient-gold">
                {s.v}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-2">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
