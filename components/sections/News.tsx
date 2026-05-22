"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { ORDERED_NEWS, getNewsCategoryLabels } from "@/lib/news";

const UI_TEXT = {
  ka: {
    label: "სიახლეები",
    title: "უახლესი",
    titleAccent: "სიახლეები",
    openAll: "ყველა სიახლე",
    details: "დეტალურად",
  },
  en: {
    label: "News",
    title: "Latest",
    titleAccent: "updates",
    openAll: "All news",
    details: "Details",
  },
  ru: {
    label: "Новости",
    title: "Последние",
    titleAccent: "новости",
    openAll: "Все новости",
    details: "Подробнее",
  },
};

export function NewsSection() {
  const { language } = useLanguage();
  const labels = getNewsCategoryLabels(language);
  const ui = UI_TEXT[language];
  const latest = ORDERED_NEWS.slice(0, 4);

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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
