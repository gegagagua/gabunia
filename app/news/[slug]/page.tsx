"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { ORDERED_NEWS, getNewsCategoryLabels } from "@/lib/news";

const UI_TEXT = {
  ka: {
    back: "← ყველა სიახლე",
    notFound: "სიახლე ვერ მოიძებნა",
  },
  en: {
    back: "← All news",
    notFound: "News not found",
  },
  ru: {
    back: "← Все новости",
    notFound: "Новость не найдена",
  },
};

function NewsDetailContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { language } = useLanguage();
  const ui = UI_TEXT[language];
  const labels = getNewsCategoryLabels(language);
  const item = ORDERED_NEWS.find((entry) => entry.slug === slug);

  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="text-sm text-brand-300 hover:text-brand-200 transition-colors">
            {ui.back}
          </Link>
          {!item && (
            <div className="glass rounded-2xl p-8 mt-6 text-center text-white/60">
              {ui.notFound}
            </div>
          )}
          {item && (
            <article className="glass rounded-2xl p-6 md:p-8 mt-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] uppercase tracking-widest text-brand-300 bg-brand-500/15 border border-brand-500/30 rounded-md px-2 py-1">
                  {labels[item.category]}
                </span>
                <span className="font-mono text-[11px] text-white/35">{item.publishedAt}</span>
              </div>
              <h1 className="font-display text-[clamp(28px,4.5vw,44px)] text-white/90 mb-4">
                {item.title[language]}
              </h1>
              <p className="text-white/55 text-base leading-relaxed mb-8">{item.summary[language]}</p>
              <div className="space-y-4">
                {item.content[language].map((paragraph) => (
                  <p key={paragraph} className="text-white/70 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function NewsDetailPage() {
  return (
    <LanguageProvider>
      <NewsDetailContent />
    </LanguageProvider>
  );
}
