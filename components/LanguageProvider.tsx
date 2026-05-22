"use client";

import { CONTENT, SiteLanguage } from "@/data/content";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const STORAGE_KEY = "gabunia-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(() => {
    if (typeof window === "undefined") {
      return "ka";
    }
    const stored = window.localStorage.getItem(STORAGE_KEY) as SiteLanguage | null;
    if (stored && CONTENT[stored]) {
      return stored;
    }
    return "ka";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
