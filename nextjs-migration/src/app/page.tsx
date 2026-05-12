import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { ClientStories } from "@/components/site/ClientStories";
import { Pricing } from "@/components/site/Pricing";
import { ClientPortal } from "@/components/site/ClientPortal";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { MobileSelectionsBar } from "@/components/site/MobileSelectionsBar";

export const metadata: Metadata = {
  title: "Build Your Footprint · Premium Web Design Studio",
  description:
    "Custom web design, brand identity, hosting, SEO, and ongoing care for businesses that value design and longevity.",
  openGraph: {
    title: "Build Your Footprint · Premium Web Design Studio",
    description:
      "Custom web design, brand identity, hosting, SEO, and ongoing care for businesses that value design and longevity.",
    url: "https://buildyourfootprint.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <ClientStories />
        <Pricing />
        <ClientPortal />
        <Contact />
      </main>
      <Footer />
      <MobileSelectionsBar />
    </div>
  );
}
