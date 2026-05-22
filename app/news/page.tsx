"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { ORDERED_NEWS, NewsCategory, NewsItem, getNewsCategoryLabels } from "@/lib/news";
import { cn } from "@/lib/utils";
import { SocialShare } from "@/components/ui/SocialShare";

type FilterCategory = "all" | NewsCategory;

const UI_TEXT = {
  ka: {
    title: "სიახლეები",
    subtitle: "სრული არქივი",
    search: "სიახლეების ძიება...",
    noResults: "სიახლე ვერ მოიძებნა",
    loading: "იტვირთება...",
    readMore: "დეტალურად",
    source: "წყარო",
    prev: "წინა",
    next: "შემდეგი",
  },
  en: {
    title: "News",
    subtitle: "Full archive",
    search: "Search news...",
    noResults: "No news found",
    loading: "Loading...",
    readMore: "Read more",
    source: "Source",
    prev: "Prev",
    next: "Next",
  },
  ru: {
    title: "Новости",
    subtitle: "Полный архив",
    search: "Поиск новостей...",
    noResults: "Новости не найдены",
    loading: "Загрузка...",
    readMore: "Подробнее",
    source: "Источник",
    prev: "Назад",
    next: "Далее",
  },
};

const PAGE_SIZE = 6;

function parseCategory(value: string | null): FilterCategory {
  if (value === "channel" || value === "science" || value === "events" || value === "education") {
    return value;
  }
  return "all";
}

function NewsContent() {
  const { language } = useLanguage();
  const labels = getNewsCategoryLabels(language);
  const ui = UI_TEXT[language];
  const searchParams = useSearchParams();
  const [allNews, setAllNews] = useState<NewsItem[]>(ORDERED_NEWS);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState<FilterCategory>(() => parseCategory(searchParams.get("category")));
  const [page, setPage] = useState(1);

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

  const filtered = useMemo(() => {
    return allNews.filter((item) => {
      const byCategory = category === "all" ? true : item.category === category;
      const text = `${item.title[language]} ${item.summary[language]}`.toLowerCase();
      const byQuery = text.includes(query.toLowerCase());
      return byCategory && byQuery;
    });
  }, [allNews, category, query, language]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em] mb-3">{ui.subtitle}</p>
            <h1 className="font-display text-[clamp(34px,5.5vw,56px)] font-black text-white/90">{ui.title}</h1>
          </div>

          <div className="glass rounded-2xl p-4 md:p-5 mb-8">
            <div className="grid md:grid-cols-[1fr_auto] gap-3">
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder={ui.search}
                className="h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white/85 placeholder-white/30 focus:outline-none focus:border-brand-500/35"
              />
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value as FilterCategory);
                  setPage(1);
                }}
                className="h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 text-sm text-white/80 focus:outline-none focus:border-brand-500/35"
              >
                {(["all", "channel", "science", "events", "education"] as FilterCategory[]).map((value) => (
                  <option key={value} value={value} className="bg-[#071007] text-white">
                    {labels[value]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && <p className="text-white/45 text-center py-16">{ui.loading}</p>}
          {!loading && items.length === 0 && <p className="text-white/45 text-center py-16">{ui.noResults}</p>}

          <div className="grid md:grid-cols-2 gap-5">
            {items.map((item) => (
              <article key={item.slug} className="glass rounded-2xl p-6 border border-white/[0.06]">
                {item.images?.[0] && (
                  <Image
                    src={item.images[0]}
                    alt={item.title[language]}
                    width={1200}
                    height={675}
                    className="w-full h-52 object-cover rounded-xl border border-white/10 mb-4"
                    loading="lazy"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-300 bg-brand-500/15 border border-brand-500/30 rounded-md px-2 py-1">
                    {labels[item.category]}
                  </span>
                  <span className="font-mono text-[11px] text-white/35">{item.publishedAt}</span>
                </div>
                <h2 className="font-display text-xl text-white/90 mb-3">{item.title[language]}</h2>
                <p className="text-sm text-white/55 leading-relaxed mb-4">{item.summary[language]}</p>
                <div className="flex items-center gap-4">
                  <Link href={`/news/${item.slug}`} className="text-sm text-brand-300 hover:text-brand-200 transition-colors">
                    {ui.readMore} →
                  </Link>
                  {item.sourceUrl && (
                    <div className="ml-auto flex items-center gap-3">
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-sm text-white/45 hover:text-white/70 transition-colors">
                        {ui.source} ↗
                      </a>
                      <SocialShare url={item.sourceUrl} title={item.title[language]} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
                className="h-9 px-3 rounded-lg border border-white/15 text-white/70 disabled:opacity-40"
              >
                {ui.prev}
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={cn(
                    "h-9 min-w-9 px-2 rounded-lg border text-sm",
                    num === currentPage
                      ? "border-brand-500/40 bg-brand-500/15 text-brand-300"
                      : "border-white/15 text-white/60"
                  )}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-3 rounded-lg border border-white/15 text-white/70 disabled:opacity-40"
              >
                {ui.next}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function NewsPage() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#040a04]" />}>
        <NewsContent />
      </Suspense>
    </LanguageProvider>
  );
}
