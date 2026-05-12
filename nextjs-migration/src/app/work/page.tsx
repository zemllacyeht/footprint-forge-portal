import type { Metadata } from "next";
import { PageLayout } from "@/components/site/PageLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Work } from "@/components/site/Work";

export const metadata: Metadata = {
  title: "Our Work · Build Your Footprint",
  description:
    "A selection of websites and digital projects designed, built, and launched by Build Your Footprint.",
  openGraph: {
    title: "Our Work · Build Your Footprint",
    description: "A selection of websites and digital projects we've delivered.",
  },
};

export default function WorkPage() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Portfolio"
        breadcrumb="Work"
        title={<>Projects we've <span className="italic text-gradient-gold">built</span>.</>}
        description="A growing collection of sites and digital experiences designed, built, and launched by our studio."
      />
      <section className="pb-24 md:pb-32">
        <div className="container">
          <Work />
        </div>
      </section>
    </PageLayout>
  );
}
