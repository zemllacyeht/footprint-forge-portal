import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  /** title/description ignored — handled by Next.js generateMetadata in each page */
  title?: string;
  description?: string;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
