"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Lightbulb } from "lucide-react";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

export function DailyFact({ embedded = false }: { embedded?: boolean }) {
  const { language } = useLanguage();
  const content = CONTENT[language].dailyFact;
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * content.facts.length));
  const [spinning, setSpinning] = useState(false);

  const next = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => { setIdx(i => (i + 1) % content.facts.length); setSpinning(false); }, 350);
  };

  const card = (
    <div className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden glow h-full min-h-[320px] md:min-h-[360px]">
          {/* background radial */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(74,222,128,0.08) 0%, transparent 65%)" }} />

          {/* top bar */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/20 flex items-center justify-center">
                <Lightbulb size={14} className="text-brand-400" />
              </div>
              <span className="font-mono text-[11px] text-brand-400/80 uppercase tracking-[0.2em]">{content.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {content.facts.map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full transition-all duration-300 ${i === idx ? "bg-brand-400 scale-125" : "bg-white/15"}`} />
                ))}
              </div>
              <button
                onClick={next}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-400 hover:border-brand-500/30 transition-all duration-300 hover:bg-brand-500/10"
              >
                <RefreshCw size={13} className={spinning ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {/* fact text */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="font-display text-xl md:text-2xl text-white/85 leading-relaxed font-medium relative"
            >
              <span className="absolute -left-2 -top-4 text-6xl text-brand-400/15 font-display leading-none select-none">&ldquo;</span>
              {content.facts[idx]}
            </motion.blockquote>
          </AnimatePresence>
    </div>
  );

  if (embedded) {
    return card;
  }

  return (
    <section className="px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        {card}
      </div>
    </section>
  );
}
