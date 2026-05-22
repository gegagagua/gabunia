"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { Plus } from "lucide-react";
import { POLL_OPTIONS, PollOptionId } from "@/lib/poll";

type PollResponse = {
  totalVotes: number;
  hasVoted: boolean;
  votedOptionId: PollOptionId | null;
  options: { id: PollOptionId; label: string; votes: number; percent: number }[];
};

export function FAQSection() {
  const { language } = useLanguage();
  const content = CONTENT[language].faq;
  const [open, setOpen] = useState<number | null>(0);
  const [selectedTopic, setSelectedTopic] = useState<PollOptionId | null>(null);
  const [poll, setPoll] = useState<PollResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/poll")
      .then((res) => res.json())
      .then((payload: PollResponse) => {
        setPoll(payload);
        setSelectedTopic(payload.votedOptionId ?? null);
      })
      .catch(() => undefined);
  }, []);

  async function submitVote() {
    if (!selectedTopic || isSubmitting || poll?.hasVoted) {
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId: selectedTopic }),
      });
      const payload = (await response.json()) as PollResponse & { error?: string };
      setPoll(payload);
      setSelectedTopic(payload.votedOptionId ?? selectedTopic);
      if (!response.ok && payload.error === "ALREADY_VOTED") {
        setError("ამ IP-დან უკვე გაგზავნილია ხმა.");
      } else if (!response.ok) {
        setError("ხმის გაგზავნა ვერ მოხერხდა. სცადეთ ხელახლა.");
      }
    } catch {
      setError("ხმის გაგზავნა ვერ მოხერხდა. სცადეთ ხელახლა.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="faq" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid xl:grid-cols-2 gap-6 items-stretch">
          <div className="space-y-3 h-full">
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

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-7 border border-white/[0.08] h-full"
          >
            <h3 className="font-display text-[clamp(24px,3.2vw,34px)] leading-tight text-white/90 mb-6">
              გთხოვთ მონიშნოთ თქვენთვის სასურველი თემები. გმადლობთ წინასწარ!
            </h3>
            <div className="space-y-3">
              {POLL_OPTIONS.map((option) => {
                const stats = poll?.options.find((item) => item.id === option.id);
                const isSelected = selectedTopic === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedTopic(option.id)}
                    disabled={Boolean(poll?.hasVoted)}
                    className={`w-full flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-brand-500/45 bg-brand-500/10"
                        : "border-white/15 bg-white/[0.02] hover:border-white/25"
                    } ${poll?.hasVoted ? "cursor-default" : ""}`}
                  >
                    <span className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? "border-brand-400" : "border-white/50"
                    }`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-brand-400" : "bg-transparent"}`} />
                    </span>
                    <div className="flex-1">
                      <p className={`text-[15px] leading-relaxed ${isSelected ? "text-white/95" : "text-white/78"}`}>
                        {option.label}
                      </p>
                      {poll?.hasVoted && stats && (
                        <div className="mt-3">
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-brand-400" style={{ width: `${stats.percent}%` }} />
                          </div>
                          <p className="mt-1 text-xs text-white/50">
                            {stats.percent}% ({stats.votes})
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={submitVote}
                disabled={!selectedTopic || Boolean(poll?.hasVoted) || isSubmitting}
                className="h-11 px-4 rounded-xl border border-brand-500/40 bg-brand-500/15 text-brand-200 disabled:opacity-45 disabled:cursor-not-allowed transition-all"
              >
                {poll?.hasVoted ? "უკვე გაგზავნილია" : isSubmitting ? "იგზავნება..." : "გაგზავნა"}
              </button>
              {poll && (
                <p className="text-sm text-white/50">
                  სულ ხმა: {poll.totalVotes}
                </p>
              )}
            </div>
            {error && <p className="mt-3 text-sm text-red-300/90">{error}</p>}
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
