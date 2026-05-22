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
