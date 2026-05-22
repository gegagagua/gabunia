"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { LATEST_VIDEOS, VideoTag } from "@/lib/videos";

type FilterTag = "all" | VideoTag;

const TAG_LABELS: Record<string, Record<FilterTag, string>> = {
  ka: { all: "ყველა", science: "მეცნიერება", nature: "ბუნება", history: "ისტორია", geography: "გეოგრაფია" },
  en: { all: "All", science: "Science", nature: "Nature", history: "History", geography: "Geography" },
  ru: { all: "Все", science: "Наука", nature: "Природа", history: "История", geography: "География" },
};

const UI_TEXT: Record<string, { search: string; openAll: string; watch: string }> = {
  ka: { search: "ძიება სრულ სიაში...", openAll: "იხილეთ ყველა.", watch: "ნახე" },
  en: { search: "Search in full list...", openAll: "See all.", watch: "Watch" },
  ru: { search: "Поиск по полному списку...", openAll: "Смотреть все.", watch: "Смотреть" },
};

export function Categories() {
  const { language } = useLanguage();
  const content = CONTENT[language].categories;
  const router = useRouter();
  const [query, setQuery] = useState("");
  const labels = TAG_LABELS[language];
  const ui = UI_TEXT[language];

  return (
    <section id="videos" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em] mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {content.label}
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(32px,5vw,52px)] font-black text-white/90 leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {content.title}{" "}
            <span className="gradient-text">{content.titleAccent}</span>
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const q = query.trim();
              router.push(q ? `/videos?q=${encodeURIComponent(q)}` : "/videos");
            }}
            className="relative w-full md:max-w-sm"
          >
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={ui.search}
              className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] pl-9 pr-3 text-sm text-white/85 placeholder-white/30 focus:outline-none focus:border-brand-500/35"
            />
          </form>
          <div className="flex items-center gap-2 flex-wrap">
            {(["all", "science", "nature", "history", "geography"] as FilterTag[]).map((tag) => (
              <Link
                key={tag}
                href={tag === "all" ? "/videos" : `/videos?tag=${tag}`}
                className="px-3 py-1.5 rounded-lg text-xs border transition-all text-white/50 border-white/10 hover:text-white/80"
              >
                {labels[tag]}
              </Link>
            ))}
            <Link
              href="/videos"
              className="px-3 py-1.5 rounded-lg text-xs border border-brand-500/40 text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 transition-all"
            >
              {ui.openAll}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {LATEST_VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:border-brand-500/25"
            >
              <Link href={`/videos?selected=${video.id}`} className="block">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/15 text-white/85 text-xs">
                    <PlayCircle size={14} />
                    YouTube
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-white/90 mb-3 group-hover:text-white transition-colors line-clamp-2 min-h-[3rem]">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {video.tags.map((tag) => (
                        <span key={`${video.id}-${tag}`} className="text-[10px] uppercase tracking-wide text-brand-300/90 bg-brand-500/12 border border-brand-500/25 rounded-md px-2 py-1">
                          {labels[tag]}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white/75 group-hover:border-white/20 transition-all duration-300"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(video.url, "_blank");
                      }}
                    >
                      <span className="sr-only">{ui.watch}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
