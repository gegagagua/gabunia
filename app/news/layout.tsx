import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "სიახლეები",
  description: "ვასილ გაბუნიას არხის სიახლეები, განცხადებები და Community posts ერთ არქივში.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "სიახლეები | ვასილ გაბუნია",
    description: "არხის უახლესი სიახლეები და პოსტები.",
    url: "/news",
    type: "website",
    images: ["/hero-research-bg.svg"],
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
