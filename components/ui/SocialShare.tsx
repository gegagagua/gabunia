"use client";

import { ExternalLink, Send } from "lucide-react";

type SocialShareProps = {
  url: string;
  title: string;
  className?: string;
};

export function SocialShare({ url, title, className }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      id: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: null,
      label: "Facebook",
    },
    {
      id: "x",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: ExternalLink,
      label: "X",
    },
    {
      id: "telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
      label: "Telegram",
    },
  ];

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Share on ${item.label}`}
              className="w-8 h-8 rounded-lg border border-white/15 text-white/65 hover:text-white hover:border-brand-500/40 hover:bg-brand-500/10 transition-all flex items-center justify-center"
            >
              {item.id === "facebook" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 22v-8h2.6l.4-3h-3v-1.9c0-.9.2-1.6 1.5-1.6h1.6V4.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.3H8.5v3h2.2v8h2.8z" />
                </svg>
              ) : (
                <Icon size={14} />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
