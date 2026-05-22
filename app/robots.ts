import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://vasilgabunia.com/sitemap.xml",
    host: "https://vasilgabunia.com",
  };
}
