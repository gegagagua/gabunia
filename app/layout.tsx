import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ვასილ გაბუნია | მეცნიერება ყველასთვის",
  description: "ბიოლოგი, მკვლევარი, YouTube-ის შემქმნელი — მეცნიერება, ბუნება, ისტორია და გეოგრაფია ქართულ ენაზე.",
  keywords: ["ვასილ გაბუნია", "ქართული მეცნიერება", "ბიოლოგია", "პალეონტოლოგია", "YouTube"],
  openGraph: {
    title: "ვასილ გაბუნია | მეცნიერება ყველასთვის",
    description: "მეცნიერება ყველასთვის — 78K+ გამომწერი, 428+ ვიდეო.",
    url: "https://vasilgabunia.com",
    siteName: "Vasil Gabunia",
    locale: "ka_GE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
