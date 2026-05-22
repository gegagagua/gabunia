"use client";
import { Button } from "@/components/ui/Button";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { language } = useLanguage();
  const content = CONTENT[language].footer;

  return (
    <footer className="relative px-6 pt-20 pb-10 border-t border-white/[0.06] overflow-hidden">
      {/* ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brand-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* top: brand + links */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-brand-400 font-mono text-sm font-bold">
                VG
              </div>
              <span className="font-display font-bold text-white">{CONTENT[language].navbar.brand}</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              {content.description}
            </p>
            <Button
              variant="glow"
              size="sm"
              onClick={() => window.open("https://www.youtube.com/@vasil_gabunia", "_blank")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.55 12 3.55 12 3.55s-7.54 0-9.38.5A3.02 3.02 0 0 0 .5 6.2C0 8.05 0 12 0 12s0 3.95.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.45 12 20.45 12 20.45s7.54 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.95 24 12 24 12s0-3.95-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
              {content.youtube}
            </Button>
          </div>

          {/* links */}
          {content.groups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-5">{group.title}</p>
              <ul className="space-y-3">
                {group.items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-white/20">
            {content.rights}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="font-mono text-[11px] text-white/20">{content.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
