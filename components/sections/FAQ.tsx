"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { Plus } from "lucide-react";

export function FAQSection() {
  const { language } = useLanguage();
  const content = CONTENT[language].faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* header */}
        <div className="text-center mb-14">
          <motion.p
            className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em] mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {content.label}
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(32px,5vw,48px)] font-black text-white/90"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {content.title}
          </motion.h2>
        </div>

        <div className="space-y-3">
          {content.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i ? "border-brand-500/20 shadow-[0_0_20px_rgba(74,222,128,0.06)]" : "hover:border-white/12"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-brand-400/50 w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-medium text-sm leading-relaxed transition-colors duration-200 ${open === i ? "text-white" : "text-white/65"}`}>
                    {item.q}
                  </span>
                </div>
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  open === i
                    ? "border-brand-500/40 bg-brand-500/15 text-brand-400 rotate-45"
                    : "border-white/10 text-white/25 hover:border-white/20"
                }`}>
                  <Plus size={13} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 pl-[4rem] text-white/45 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
