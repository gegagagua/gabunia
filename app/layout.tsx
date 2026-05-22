import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vasilgabunia.com"),
  title: {
    default: "ვასილ გაბუნია | მეცნიერება ყველასთვის",
    template: "%s | ვასილ გაბუნია",
  },
  description: "ბიოლოგი, მკვლევარი, YouTube-ის შემქმნელი — მეცნიერება, ბუნება, ისტორია და გეოგრაფია ქართულ ენაზე.",
  keywords: ["ვასილ გაბუნია", "ქართული მეცნიერება", "ბიოლოგია", "პალეონტოლოგია", "YouTube"],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "ვასილ გაბუნია | მეცნიერება ყველასთვის",
    description: "მეცნიერება ყველასთვის — 78K+ გამომწერი, 428+ ვიდეო.",
    url: "/",
    siteName: "Vasil Gabunia",
    locale: "ka_GE",
    type: "website",
    images: [
      {
        url: "/hero-research-bg.svg",
        width: 1200,
        height: 630,
        alt: "Vasil Gabunia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ვასილ გაბუნია | მეცნიერება ყველასთვის",
    description: "მეცნიერება ყველასთვის — 78K+ გამომწერი, 428+ ვიდეო.",
    images: ["/hero-research-bg.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
