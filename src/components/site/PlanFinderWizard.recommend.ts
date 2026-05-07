export type SiteType = "landing" | "small" | "content" | "ecom";
export type Goal = "local" | "leads" | "sell" | "credibility";
export type BrandState = "ready" | "logo-only" | "refresh" | "scratch";
export type Marketing = "seo" | "social" | "content" | "none";
export type Timeline = "asap" | "2-4w" | "1-2m" | "flex";

export interface WizardAnswers {
  site?: SiteType;
  goal?: Goal;
  brand?: BrandState;
  marketing: Marketing[];
  timeline?: Timeline;
  budget: number; // 0 lean, 1 mid, 2 premium
}

export interface CartLine {
  id: string;
  name: string;
  price: string;
  category: "Build package" | "Care plan" | "Add-on";
  rationale: string;
}

export interface Recommendation {
  build: CartLine;
  care: CartLine;
  addons: CartLine[];
  summary: string;
}

const BUILDS: Record<string, Omit<CartLine, "rationale">> = {
  core: { id: "build-core", name: "Core", price: "$499 one-time", category: "Build package" },
  launch: { id: "build-launch", name: "Launch", price: "$999 one-time", category: "Build package" },
  signature: { id: "build-signature", name: "Signature", price: "$1,499 one-time", category: "Build package" },
  enterprise: { id: "build-enterprise", name: "Enterprise", price: "Custom one-time", category: "Build package" },
};

const CARES: Record<string, Omit<CartLine, "rationale">> = {
  essential: { id: "care-essential", name: "Essential Care", price: "$19/mo", category: "Care plan" },
  growth: { id: "care-growth", name: "Growth Care", price: "$59/mo", category: "Care plan" },
  white: { id: "care-white-glove", name: "White-Glove Care", price: "Custom/mo", category: "Care plan" },
};

const ADDONS: Record<string, Omit<CartLine, "rationale">> = {
  brand: { id: "addon-brand-identity", name: "Brand Identity Kit", price: "From $799", category: "Add-on" },
  seo: { id: "addon-seo-boost", name: "SEO Boost", price: "From $349/mo", category: "Add-on" },
  marketing: { id: "addon-marketing-collateral", name: "Marketing Collateral", price: "From $249/mo", category: "Add-on" },
  content: { id: "addon-content-photography", name: "Content & Photography", price: "From $499", category: "Add-on" },
};

export function recommend(a: WizardAnswers): Recommendation {
  // Build tier scoring
  let buildKey: keyof typeof BUILDS = "launch";
  if (a.site === "ecom" || (a.brand === "refresh" && a.goal === "sell")) buildKey = "enterprise";
  else if (a.site === "content" || a.goal === "credibility" || a.brand === "scratch") buildKey = "signature";
  else if (a.site === "small" || a.goal === "leads") buildKey = "launch";
  else if (a.site === "landing" || (a.timeline === "asap" && a.goal === "local")) buildKey = "core";

  // Budget nudges down a tier if user picked lean
  if (a.budget === 0 && buildKey === "signature") buildKey = "launch";
  if (a.budget === 0 && buildKey === "launch" && a.site === "landing") buildKey = "core";

  const careKey: keyof typeof CARES =
    buildKey === "enterprise" ? "white" : buildKey === "signature" ? "growth" : "essential";

  const addonKeys: (keyof typeof ADDONS)[] = [];
  if (a.brand === "refresh" || a.brand === "scratch") addonKeys.push("brand");
  if (a.marketing.includes("seo") || a.goal === "local") addonKeys.push("seo");
  if (a.marketing.includes("social")) addonKeys.push("marketing");
  if (a.marketing.includes("content")) addonKeys.push("content");

  const buildRationale = (() => {
    switch (buildKey) {
      case "core":
        return "A focused single page launch fits a fast timeline and a get found locally goal.";
      case "launch":
        return "A polished 3 to 5 page site is the sweet spot for generating leads with room to grow.";
      case "signature":
        return "Up to 12 custom pages plus brand basics give you the depth credibility and content require.";
      case "enterprise":
        return "E-commerce, bookings, and custom integrations call for a tailored scope and dedicated PM.";
    }
  })();

  const careRationale = (() => {
    switch (careKey) {
      case "essential":
        return "Keeps hosting, SSL, and weekly backups handled without overpaying.";
      case "growth":
        return "Adds daily backups, CMS updates, and 30 minutes of monthly edits to match a richer build.";
      case "white":
        return "A dedicated account manager and SLA to match a high stakes site.";
    }
  })();

  const addonRationale: Record<keyof typeof ADDONS, string> = {
    brand: "Your brand needs work, so a logo, color, and type system gives the new site a strong base.",
    seo: "You want to be found, so monthly SEO accelerates rankings instead of hoping for them.",
    marketing: "Ongoing social and ad creative keeps your launch momentum visible every month.",
    content: "Real photography and copy ready to drop in means launch day is not held up by missing assets.",
  };

  const summary =
    a.timeline === "asap"
      ? "Built around a fast timeline so you can launch and iterate."
      : a.timeline === "flex"
      ? "Paced to let design and content breathe without rushing decisions."
      : "Balanced for a healthy timeline with clear milestones.";

  return {
    build: { ...BUILDS[buildKey], rationale: buildRationale },
    care: { ...CARES[careKey], rationale: careRationale },
    addons: addonKeys.map((k) => ({ ...ADDONS[k], rationale: addonRationale[k] })),
    summary,
  };
}
