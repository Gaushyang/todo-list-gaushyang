import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = services.map((service) => ({
    url: `${site.url}/services/${service.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    ...servicePages,
    { url: `${site.url}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
