"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { ORDERED_NEWS, NewsItem, getNewsCategoryLabels } from "@/lib/news";
import { SocialShare } from "@/components/ui/SocialShare";

const UI_TEXT = {
  ka: {
    back: "← ყველა სიახლე",
    loading: "იტვირთება...",
    notFound: "სიახლე ვერ მოიძებნა",
    source: "წყარო",
  },
  en: {
    back: "← All news",
    loading: "Loading...",
    notFound: "News not found",
    source: "Source",
  },
  ru: {
    back: "← Все новости",
    loading: "Загрузка...",
    notFound: "Новость не найдена",
    source: "Источник",
  },
};

function NewsDetailContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { language } = useLanguage();
  const ui = UI_TEXT[language];
  const labels = getNewsCategoryLabels(language);
  const [allNews, setAllNews] = useState<NewsItem[]>(ORDERED_NEWS);
  const [loading, setLoading] = useState(true);
  const item = allNews.find((entry) => entry.slug === slug);

  useEffect(() => {
    let active = true;
    fetch("/api/news")
      .then((res) => res.json())
      .then((payload: { items?: NewsItem[] }) => {
        if (!active || !Array.isArray(payload.items)) {
          return;
        }
        setAllNews(payload.items);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="text-sm text-brand-300 hover:text-brand-200 transition-colors">
            {ui.back}
          </Link>
          {loading && (
            <div className="glass rounded-2xl p-8 mt-6 text-center text-white/60">
              {ui.loading}
            </div>
          )}
          {!loading && !item && (
            <div className="glass rounded-2xl p-8 mt-6 text-center text-white/60">
              {ui.notFound}
            </div>
          )}
          {item && (
            <article className="glass rounded-2xl p-6 md:p-8 mt-6">
              {item.images && item.images.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {item.images.map((image) => (
                    <Image
                      key={image}
                      src={image}
                      alt={item.title[language]}
                      width={1200}
                      height={675}
                      className="w-full h-56 object-cover rounded-xl border border-white/10"
                      loading="lazy"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] uppercase tracking-widest text-brand-300 bg-brand-500/15 border border-brand-500/30 rounded-md px-2 py-1">
                  {labels[item.category]}
                </span>
                <span className="font-mono text-[11px] text-white/35">{item.publishedAt}</span>
              </div>
              <h1 className="font-display text-[clamp(20px,3.2vw,31px)] text-white/90 mb-4">
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
              {item.sourceUrl && (
                <div className="mt-6 flex items-center justify-between gap-3">
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-300 hover:text-brand-200 transition-colors">
                    {ui.source} ↗
                  </a>
                  <SocialShare url={item.sourceUrl} title={item.title[language]} />
                </div>
              )}
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
