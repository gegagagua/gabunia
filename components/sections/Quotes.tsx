"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Quotes({ embedded = false }: { embedded?: boolean }) {
  const { language } = useLanguage();
  const content = CONTENT[language].quotes;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setIdx(i => (i + d + content.items.length) % content.items.length);
  };

  if (embedded) {
    return (
      <div className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden glow h-full min-h-[320px] md:min-h-[360px]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/6 blur-[100px] rounded-full" />
        </div>

        <div className="relative flex items-center justify-between mb-8">
          <div className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em]">{content.label}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <blockquote className="font-display text-xl md:text-2xl text-white/85 leading-relaxed font-medium mb-8 relative">
              <span className="absolute -left-2 -top-4 text-6xl text-brand-400/15 font-display leading-none select-none">&ldquo;</span>
              {content.items[idx].text}
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-brand-400/50" />
              <span className="font-mono text-sm text-brand-400/70">{content.items[idx].author}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  const contentBlock = (
    <div className="relative overflow-hidden h-full">
      {/* ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/6 blur-[100px] rounded-full" />
      </div>

      <div className="relative h-full">
        {/* label */}
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em]">{content.label}</p>
        </div>

        {/* quote card */}
        <div className="relative glass rounded-3xl p-10 md:p-16 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

          {/* large decorative quote */}
          <div
            className="absolute top-6 left-8 font-display font-black text-[120px] leading-none select-none pointer-events-none"
            style={{ color: "rgba(74,222,128,0.07)" }}
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <blockquote className="font-display text-2xl md:text-3xl font-semibold text-white/85 leading-relaxed mb-8">
                {content.items[idx].text}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-brand-400/50" />
                <span className="font-mono text-sm text-brand-400/70">{content.items[idx].author}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {content.items.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-brand-400" : "w-1.5 bg-white/15 hover:bg-white/30"}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return contentBlock;
  }

  return (
    <section className="relative px-6 pb-12 md:pb-24 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {contentBlock}
      </div>
    </section>
  );
}
