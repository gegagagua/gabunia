"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

function useCountUp(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const p = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        setCount(Math.round(target * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

const ICONS = ["👥", "👁️", "🎬", "🌐"];

function StatCard({ value, label, suffix, icon, i }: { value: number; label: string; suffix: string; icon: string; i: number }) {
  const { count, ref } = useCountUp(value);
  const display = value >= 1_000_000
    ? (count / 1_000_000).toFixed(1) + "M"
    : value >= 1_000
    ? (count / 1_000).toFixed(count >= 1_000 ? 1 : 0) + "K"
    : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass rounded-2xl p-8 overflow-hidden hover:border-brand-500/20 hover:bg-white/[0.05] transition-all duration-500"
    >
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

      {/* background glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />

      <div className="relative">
        <div className="text-2xl mb-4">{icon}</div>
        <div className="font-display text-[clamp(36px,5vw,52px)] font-black gradient-text mb-1 leading-none">
          {display}{suffix}
        </div>
        <div className="font-mono text-xs text-white/35 uppercase tracking-widest mt-2">{label}</div>
      </div>
    </motion.div>
  );
}

export function Stats() {
  const { language } = useLanguage();
  const stats = CONTENT[language].stats;

  return (
    <section className="relative px-6 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.label} {...s} icon={ICONS[i]} i={i} />)}
      </div>
    </section>
  );
}
