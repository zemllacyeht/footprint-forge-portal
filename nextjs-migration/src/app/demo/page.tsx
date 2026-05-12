import type { Metadata } from "next";
import { Component } from "@/components/ui/the-infinite-grid";

export const metadata: Metadata = {
  title: "Demo · Build Your Footprint",
  description: "Interactive demo component showcase.",
};

export default function DemoPage() {
  return <Component />;
}
