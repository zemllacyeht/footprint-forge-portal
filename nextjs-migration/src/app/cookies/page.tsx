import type { Metadata } from "next";
import { PageLayout } from "@/components/site/PageLayout";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Cookie Policy · Build Your Footprint",
  description: "Cookie policy for Build Your Footprint Web Services.",
};

export default function CookiesPage() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Legal"
        breadcrumb="Cookie Policy"
        title={<>Cookie <span className="italic text-gradient-gold">Policy</span></>}
      />
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="glass rounded-2xl p-8 md:p-12 text-muted-foreground leading-relaxed space-y-4">
            <p>
              This page is being updated. In the meantime, our full Cookie Policy is available
              through our compliance documentation hosted on Termly.
            </p>
            <p>
              For questions about how we use cookies, email us at{" "}
              <a
                href="mailto:hello@buildyourfootprint.com"
                className="text-accent hover:underline underline-offset-4"
              >
                hello@buildyourfootprint.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
