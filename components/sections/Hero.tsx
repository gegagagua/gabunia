"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const { language } = useLanguage();
  const content = CONTENT[language].hero;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-research-bg.svg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020703]/75 via-[#020703]/70 to-[#020703]/90" />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-brand-600/8 blur-[120px] animate-float" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-800/10 blur-[100px] animate-float [animation-delay:-3s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-400/5 blur-[80px]" />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <Badge>{content.badge}</Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display font-black leading-[0.95] tracking-tight mb-5 text-[clamp(34px,6.5vw,84px)] text-white/95">
            {content.channelTitle}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-400/60 to-transparent mx-auto mb-8"
        />

        <motion.p
          className="text-[clamp(16px,2.2vw,22px)] text-brand-200/90 max-w-4xl mx-auto mb-8 leading-relaxed font-medium"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.7 }}
        >
          {content.motto}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7 }}
          className="max-w-5xl mx-auto mb-10 text-left glass rounded-2xl p-6 md:p-8 border border-white/[0.08]"
        >
          <p className="text-white/70 leading-relaxed mb-5">{content.intro}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300/85 mb-4">{content.focusTitle}</p>
          <ul className="space-y-3 mb-5">
            {content.focusAreas.map((line) => (
              <li key={line} className="text-white/65 leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
          <p className="text-white/60 leading-relaxed mb-4">{content.audience}</p>
          <p className="text-brand-200/90 leading-relaxed font-medium">{content.joinLine}</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            size="lg"
            onClick={() => window.open("https://www.youtube.com/@vasil_gabunia", "_blank")}
            className="shadow-[0_0_32px_rgba(74,222,128,0.25)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.55 12 3.55 12 3.55s-7.54 0-9.38.5A3.02 3.02 0 0 0 .5 6.2C0 8.05 0 12 0 12s0 3.95.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.45 12 20.45 12 20.45s7.54 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.95 24 12 24 12s0-3.95-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
            {content.subscribe}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              window.location.href = "/videos";
            }}
          >
            {content.watchContent}
            <ArrowDown size={16} />
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
        >
          {content.statPills.map(({ n, l }) => (
            <div key={l} className="glass rounded-full px-5 py-2 flex items-center gap-2.5">
              <span className="font-mono font-bold text-brand-400 text-sm">{n}</span>
              <span className="text-white/35 text-xs">{l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
