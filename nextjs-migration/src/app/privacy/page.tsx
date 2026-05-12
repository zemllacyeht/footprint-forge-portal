import type { Metadata } from "next";
import { PageLayout } from "@/components/site/PageLayout";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy · Build Your Footprint",
  description: "Privacy policy for Build Your Footprint Web Services.",
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Legal"
        breadcrumb="Privacy Policy"
        title={<>Privacy <span className="italic text-gradient-gold">Policy</span></>}
      />
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="glass rounded-2xl p-8 md:p-12 text-muted-foreground leading-relaxed space-y-4">
            <p>
              This page is being updated. In the meantime, our full Privacy Policy is available
              through our compliance documentation hosted on Termly.
            </p>
            <p>
              For privacy-related questions, email us at{" "}
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
