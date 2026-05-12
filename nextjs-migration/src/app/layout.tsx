import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Build Your Footprint · Premium Web Design Studio",
    template: "%s · Build Your Footprint",
  },
  description:
    "Custom web design, brand identity, hosting, SEO, and ongoing care for businesses that value design and longevity.",
  metadataBase: new URL("https://buildyourfootprint.com"),
  openGraph: {
    siteName: "Build Your Footprint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
