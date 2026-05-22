"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { ALL_VIDEOS, VideoTag } from "@/lib/videos";
import { cn } from "@/lib/utils";

type FilterTag = "all" | VideoTag;
type SortMode = "newest" | "oldest";

const TAG_LABELS: Record<string, Record<FilterTag, string>> = {
  ka: { all: "ყველა", science: "მეცნიერება", nature: "ბუნება", history: "ისტორია", geography: "გეოგრაფია" },
  en: { all: "All", science: "Science", nature: "Nature", history: "History", geography: "Geography" },
  ru: { all: "Все", science: "Наука", nature: "Природа", history: "История", geography: "География" },
};

const UI_TEXT: Record<string, {
  title: string;
  subtitle: string;
  search: string;
  sortNewest: string;
  sortOldest: string;
  noResults: string;
  backHome: string;
  prev: string;
  next: string;
}> = {
  ka: {
    title: "YouTube ვიდეოები",
    subtitle: "ძიება, თაგები, ფილტრი და pagination",
    search: "ვიდეოს ძიება...",
    sortNewest: "უახლესი",
    sortOldest: "ძველი",
    noResults: "შედეგი ვერ მოიძებნა",
    backHome: "მთავარზე დაბრუნება",
    prev: "წინა",
    next: "შემდეგი",
  },
  en: {
    title: "YouTube Videos",
    subtitle: "Search, tags, filters and pagination",
    search: "Search videos...",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    noResults: "No videos found",
    backHome: "Back to home",
    prev: "Prev",
    next: "Next",
  },
  ru: {
    title: "Видео YouTube",
    subtitle: "Поиск, теги, фильтры и пагинация",
    search: "Поиск видео...",
    sortNewest: "Новые",
    sortOldest: "Старые",
    noResults: "Видео не найдены",
    backHome: "Назад на главную",
    prev: "Назад",
    next: "Далее",
  },
};

const PAGE_SIZE = 6;

function parseTag(value: string | null): FilterTag {
  if (value === "science" || value === "nature" || value === "history" || value === "geography") {
    return value;
  }
  return "all";
}

function VideosContent() {
  const { language } = useLanguage();
  const labels = TAG_LABELS[language];
  const ui = UI_TEXT[language];
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("selected");
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [activeTag, setActiveTag] = useState<FilterTag>(() => parseTag(searchParams.get("tag")));
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const base = ALL_VIDEOS.filter((video) => {
      const matchesQuery = video.title.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag === "all" ? true : video.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
    return [...base].sort((a, b) => (sortMode === "newest" ? a.position - b.position : b.position - a.position));
  }, [activeTag, query, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em] mb-3">{ui.subtitle}</p>
              <h1 className="font-display text-[clamp(34px,5.5vw,56px)] font-black text-white/90">{ui.title}</h1>
              <p className="text-white/35 text-sm mt-2">{ALL_VIDEOS.length} videos</p>
            </div>
            <Link href="/#videos" className="text-sm text-brand-300 border border-brand-500/30 rounded-lg px-3 py-2 hover:bg-brand-500/10 transition-all">
              {ui.backHome}
            </Link>
          </div>

          <div className="glass rounded-2xl p-4 md:p-5 mb-8">
            <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
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
                value={activeTag}
                onChange={(event) => {
                  setActiveTag(event.target.value as FilterTag);
                  setPage(1);
                }}
                className="h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 text-sm text-white/80 focus:outline-none focus:border-brand-500/35"
              >
                {(["all", "science", "nature", "history", "geography"] as FilterTag[]).map((tag) => (
                  <option key={tag} value={tag} className="bg-[#071007] text-white">
                    {labels[tag]}
                  </option>
                ))}
              </select>
              <div className="flex rounded-xl border border-white/[0.08] overflow-hidden h-11">
                <button
                  onClick={() => {
                    setSortMode("newest");
                    setPage(1);
                  }}
                  className={cn("px-4 text-sm", sortMode === "newest" ? "bg-brand-500/15 text-brand-300" : "text-white/50")}
                >
                  {ui.sortNewest}
                </button>
                <button
                  onClick={() => {
                    setSortMode("oldest");
                    setPage(1);
                  }}
                  className={cn("px-4 text-sm border-l border-white/[0.08]", sortMode === "oldest" ? "bg-brand-500/15 text-brand-300" : "text-white/50")}
                >
                  {ui.sortOldest}
                </button>
              </div>
            </div>
          </div>

          {items.length === 0 && <p className="text-white/45 text-center py-16">{ui.noResults}</p>}

          <div className="grid lg:grid-cols-2 gap-5">
            {items.map((video) => (
              <article
                key={video.id}
                className={cn(
                  "glass rounded-2xl overflow-hidden border transition-all duration-300",
                  selectedId === video.id ? "border-brand-500/50 shadow-[0_0_0_1px_rgba(74,222,128,0.35)]" : "border-white/[0.06]"
                )}
              >
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-display text-lg font-semibold text-white/90 mb-3 line-clamp-2">{video.title}</h3>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-2 flex-wrap">
                      {video.tags.map((tag) => (
                        <span key={`${video.id}-${tag}`} className="text-[10px] uppercase tracking-wide text-brand-300/90 bg-brand-500/12 border border-brand-500/25 rounded-md px-2 py-1">
                          {labels[tag]}
                        </span>
                      ))}
                    </div>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs border border-white/15 rounded-lg px-2.5 py-1.5 text-white/70 hover:text-white hover:border-white/30"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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

export default function VideosPage() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#040a04]" />}>
        <VideosContent />
      </Suspense>
    </LanguageProvider>
  );
}
