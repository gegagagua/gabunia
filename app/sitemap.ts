import type { MetadataRoute } from "next";
import { ORDERED_NEWS } from "@/lib/news";

const BASE_URL = "https://vasilgabunia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/news`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/videos`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const newsRoutes: MetadataRoute.Sitemap = ORDERED_NEWS.map((item) => ({
    url: `${BASE_URL}/news/${item.slug}`,
    lastModified: item.publishedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes];
}
