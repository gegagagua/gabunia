import { Navbar }     from "@/components/Navbar";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Hero }       from "@/components/sections/Hero";
import { Stats }      from "@/components/sections/Stats";
import { DailyFact }  from "@/components/sections/DailyFact";
import { Categories } from "@/components/sections/Categories";
import { Quotes }     from "@/components/sections/Quotes";
import { NewsSection } from "@/components/sections/News";
import { ChatWidget } from "@/components/sections/Chat";
import { FAQSection } from "@/components/sections/FAQ";
import { Footer }     from "@/components/sections/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vasil Gabunia",
  alternateName: "ვასილ გაბუნია",
  url: "https://vasilgabunia.com",
  jobTitle: "Biologist and Researcher",
  worksFor: {
    "@type": "Organization",
    name: "YouTube",
  },
  sameAs: [
    "https://www.youtube.com/@vasil_gabunia",
    "https://instagram.com/vaso_gabunia",
  ],
  knowsAbout: ["Biology", "Paleontology", "History", "Geography", "Science Communication"],
};

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-4">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Stats />
        <Divider />
        <Categories />
        <Divider />
        <section className="px-6 pb-24">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
            <DailyFact embedded />
            <Quotes embedded />
          </div>
        </section>
        <Divider />
        <NewsSection />
        <Divider />
        <ChatWidget />
        <Divider />
        <FAQSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
