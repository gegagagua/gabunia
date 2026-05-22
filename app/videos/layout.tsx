import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ვიდეოები",
  description: "ვასილ გაბუნიას YouTube ვიდეოების არქივი: თემები, ფილტრები და სწრაფი ძიება.",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "ვიდეოები | ვასილ გაბუნია",
    description: "YouTube ვიდეოების სრული არქივი და კატეგორიები.",
    url: "/videos",
    type: "website",
    images: ["/hero-research-bg.svg"],
  },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
