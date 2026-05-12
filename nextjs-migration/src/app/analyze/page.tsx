import type { Metadata } from "next";
import { Suspense } from "react";
import { PageLayout } from "@/components/site/PageLayout";
import { AnalyzerClient } from "./analyze-client";

export const metadata: Metadata = {
  title: "Free Website Audit · Build Your Footprint",
  description:
    "Get an instant SEO, performance, AI visibility, and security score for any website. Free tool by Build Your Footprint.",
  openGraph: {
    title: "Free Website Audit · Build Your Footprint",
    description: "See exactly what's costing your website customers. Instant. Free.",
  },
};

export default function AnalyzePage() {
  return (
    <PageLayout>
      <Suspense>
        <AnalyzerClient />
      </Suspense>
    </PageLayout>
  );
}
