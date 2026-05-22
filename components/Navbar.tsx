"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LANGUAGES, CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { language, setLanguage } = useLanguage();
  const content = CONTENT[language].navbar;

  useEffect(() => {
    const handler = () => {
      const s = window.scrollY;
      setScrolled(s > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (s / max) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600 transition-all duration-100"
          style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(74,222,128,0.6)" }}
        />
      </div>

      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
        scrolled
          ? "py-3 bg-[#040a04]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "py-5"
      )}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-brand-400 font-mono text-sm font-bold group-hover:bg-brand-500/25 group-hover:border-brand-400/40 group-hover:shadow-[0_0_16px_rgba(74,222,128,0.2)] transition-all duration-300">
              VG
            </div>
            <span className="font-display font-semibold text-white text-sm tracking-wide hidden sm:block">{content.brand}</span>
          </a>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {content.links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm text-white/50 hover:text-white/90 transition-colors duration-200 rounded-lg hover:bg-white/[0.04] group"
              >
                {l.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-400 group-hover:w-4 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLanguage(item.code)}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all duration-200",
                    language === item.code
                      ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                      : "text-white/45 hover:text-white/80"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button
              variant="glow"
              size="sm"
              onClick={() => window.open("https://www.youtube.com/@vasil_gabunia", "_blank")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.55 12 3.55 12 3.55s-7.54 0-9.38.5A3.02 3.02 0 0 0 .5 6.2C0 8.05 0 12 0 12s0 3.95.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.45 12 20.45 12 20.45s7.54 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.95 24 12 24 12s0-3.95-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
              {content.subscribe}
            </Button>
          </div>

          {/* mobile burger */}
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all" onClick={() => setOpen(!open)}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="md:hidden mt-3 p-4 glass rounded-2xl space-y-1">
            <div className="flex items-center justify-center gap-2 pb-3">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLanguage(item.code)}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all duration-200",
                    language === item.code
                      ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                      : "text-white/45 hover:text-white/80 border border-white/10"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {content.links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/[0.06]">
              <Button variant="glow" size="sm" className="w-full" onClick={() => window.open("https://www.youtube.com/@vasil_gabunia", "_blank")}>
                {content.subscribe} ↗
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
