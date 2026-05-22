"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Atom } from "lucide-react";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

type Message = { role: "user" | "assistant"; content: string };
type ChatContent = (typeof CONTENT)[keyof typeof CONTENT]["chat"];

export function ChatWidget() {
  const { language } = useLanguage();
  const chatContent = CONTENT[language].chat;

  return <ChatWidgetInner key={language} chatContent={chatContent} />;
}

function ChatWidgetInner({ chatContent }: { chatContent: ChatContent }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: chatContent.hello }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send(text?: string) {
    const textValue = text ?? input;
    if (!textValue.trim() || loading) return;
    const userMsg: Message = { role: "user", content: textValue };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], system: chatContent.system }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.content }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: chatContent.error }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const isFirst = messages.length === 1;

  return (
    <section id="chat" className="px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* header */}
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] text-brand-400/70 uppercase tracking-[0.25em] mb-4">{chatContent.label}</p>
          <h2 className="font-display text-[clamp(32px,5vw,48px)] font-black text-white/90">
            {chatContent.title} <span className="gradient-text">{chatContent.titleAccent}</span>
          </h2>
        </div>

        {/* chat window */}
        <div className="glass rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(74,222,128,0.08),0_0_50px_rgba(0,0,0,0.5)]">
          {/* title bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-black/20">
            <div className="flex gap-1.5">
              {["bg-red-500/60","bg-yellow-500/60","bg-green-500/60"].map(c => (
                <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
              ))}
            </div>
            <div className="flex-1 text-center font-mono text-[11px] text-white/25">{chatContent.assistantName}</div>
            <div className="w-12 flex justify-end">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            </div>
          </div>

          {/* messages */}
          <div className="h-80 overflow-y-auto p-5 space-y-5 bg-black/10">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" ? (
                  <div className="w-8 h-8 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-brand-400 shrink-0 mt-0.5">
                    <Atom size={14} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50 shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                    U
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-white/[0.04] text-white/80 rounded-tl-sm border border-white/[0.06]"
                    : "bg-brand-600/20 text-brand-100 rounded-tr-sm border border-brand-500/20"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-brand-400 shrink-0">
                  <Atom size={14} />
                </div>
                <div className="px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5 items-center h-4">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-brand-400/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          {/* suggestions (show only at start) */}
          {isFirst && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 border-t border-white/[0.04] pt-3 bg-black/10">
              {chatContent.suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 text-xs text-white/40 border border-white/[0.08] rounded-lg hover:text-white/70 hover:border-brand-500/30 hover:bg-brand-500/8 transition-all duration-200 font-mono"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* input */}
          <div className="flex gap-2 p-4 border-t border-white/[0.06] bg-black/20">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder={chatContent.placeholder}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-brand-500/40 focus:bg-white/[0.06] transition-all font-mono"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
