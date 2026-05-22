"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { NewsItem, ORDERED_NEWS, getNewsCategoryLabels } from "@/lib/news";
import { SocialShare } from "@/components/ui/SocialShare";

const UI_TEXT = {
  ka: {
    label: "სიახლეები",
    title: "უახლესი",
    titleAccent: "სიახლეები",
    openAll: "ყველა სიახლე",
    details: "დეტალურად",
    source: "წყარო",
  },
  en: {
    label: "News",
    title: "Latest",
    titleAccent: "updates",
    openAll: "All news",
    details: "Details",
    source: "Source",
  },
  ru: {
    label: "Новости",
    title: "Последние",
    titleAccent: "новости",
    openAll: "Все новости",
    details: "Подробнее",
    source: "Источник",
  },
};

export function NewsSection() {
  const { language } = useLanguage();
  const labels = getNewsCategoryLabels(language);
  const ui = UI_TEXT[language];
  const [latest, setLatest] = useState<NewsItem[]>(ORDERED_NEWS.slice(0, 4));

  useEffect(() => {
    let active = true;
    fetch("/api/news")
      .then((res) => res.json())
      .then((payload: { items?: NewsItem[] }) => {
        if (!active || !Array.isArray(payload.items)) {
          return;
        }
        setLatest(payload.items.slice(0, 4));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="news" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em] mb-3">{ui.label}</p>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-black text-white/90">
              {ui.title} <span className="gradient-text">{ui.titleAccent}</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm text-brand-300 border border-brand-500/30 rounded-lg px-3 py-2 hover:bg-brand-500/10 transition-all"
          >
            {ui.openAll}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {latest.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-brand-500/30 transition-all"
            >
              {item.images?.[0] && (
                <Image
                  src={item.images[0]}
                  alt={item.title[language]}
                  width={1200}
                  height={675}
                  className="w-full h-48 object-cover rounded-xl border border-white/10 mb-4"
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
              <h3 className="font-display text-xl text-white/90 mb-3">{item.title[language]}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-5">{item.summary[language]}</p>
              <Link
                href={`/news/${item.slug}`}
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                {ui.details}
                <ArrowUpRight size={14} />
              </Link>
              {item.sourceUrl && (
                <div className="mt-4 flex items-center justify-between gap-3">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-brand-300 hover:text-brand-200 transition-colors"
                  >
                    {ui.source}
                    <ArrowUpRight size={14} />
                  </a>
                  <SocialShare url={item.sourceUrl} title={item.title[language]} />
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
