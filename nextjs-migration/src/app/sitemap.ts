import { MetadataRoute } from "next";

const BASE = "https://buildyourfootprint.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: BASE, priority: 1.0 },
    { url: `${BASE}/services`, priority: 0.9 },
    { url: `${BASE}/process`, priority: 0.8 },
    { url: `${BASE}/work`, priority: 0.8 },
    { url: `${BASE}/pricing`, priority: 0.9 },
    { url: `${BASE}/contact`, priority: 0.9 },
    { url: `${BASE}/demo`, priority: 0.5 },
  ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
