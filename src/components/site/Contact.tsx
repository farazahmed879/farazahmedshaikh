"use client";

import { useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import type { Profile } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SocialIcon, { socialMeta } from "./SocialIcon";
import { Stumps } from "./cricket";
import { kit } from "./palette";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("error");
    }
  }

  const input =
    "w-full border-0 border-b-2 border-pitch-950/20 bg-transparent px-1 py-2.5 text-lg text-pitch-950 placeholder:text-pitch-900/35 outline-none transition focus:border-ball";

  return (
    <section id="contact" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          eyebrow="Make an appeal"
          title={
            <>
              <span className="hl">Howzat?</span> {profile.contactHeading}
            </>
          }
          subtitle={profile.contactMessage}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          <Reveal className="space-y-4">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="board group flex items-center gap-4 p-5 transition-transform hover:-translate-y-1">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ball text-white">
                  <HiOutlineMail className="h-7 w-7" />
                </span>
                <span className="min-w-0">
                  <span className="cond block text-[11px] text-lime">Direct line</span>
                  <span className="block truncate text-lg font-semibold text-chalk group-hover:text-amber">{profile.email}</span>
                </span>
              </a>
            )}
            <div className="grid grid-cols-3 gap-3">
              {profile.socials.map((s, i) => (
                <a
                  key={s.platform + s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 rounded-2xl border-2 border-pitch-950 px-2 py-4 text-pitch-950 shadow-[4px_4px_0_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 hover:rotate-[-3deg]"
                  style={{ background: kit(i) }}
                >
                  <SocialIcon platform={s.platform} className="h-6 w-6" />
                  <span className="cond text-[10px]">{socialMeta(s.platform).label}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="chalk-card seam relative overflow-hidden p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-2 -bottom-2 opacity-90">
              <Stumps out={status === "sent"} className="h-32 w-24" />
            </div>
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[380px] flex-col items-start justify-center"
                >
                  <motion.span
                    initial={{ y: 40, rotate: -30, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
                    className="text-7xl"
                  >
                    ☝️
                  </motion.span>
                  <h3 className="font-display mt-4 text-6xl font-black text-pitch-950 uppercase">That&apos;s out!</h3>
                  <p className="mt-2 max-w-sm text-lg text-pitch-900/75">Appeal given — your message is in. I&apos;ll get back to you soon.</p>
                  <button onClick={() => setStatus("idle")} className="cond mt-6 rounded-full border-2 border-pitch-950 px-6 py-3 text-sm text-pitch-950 hover:bg-pitch-950 hover:text-chalk">
                    Bowl another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative space-y-5 pr-0 sm:pr-16">
                  <p className="cond text-xs text-ball">Appeal form · send me a message</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="cond block text-[11px] text-pitch-900/55">Your name</span>
                      <input name="name" required maxLength={120} className={input} placeholder="Who's bowling?" />
                    </label>
                    <label className="block">
                      <span className="cond block text-[11px] text-pitch-900/55">Email</span>
                      <input name="email" type="email" required maxLength={200} className={input} placeholder="you@company.com" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="cond block text-[11px] text-pitch-900/55">Subject</span>
                    <input name="subject" maxLength={200} className={input} placeholder="Project, role, or just hello" />
                  </label>
                  <label className="block">
                    <span className="cond block text-[11px] text-pitch-900/55">Message</span>
                    <textarea name="message" required minLength={5} maxLength={5000} rows={4} className={`${input} resize-none`} placeholder="Tell me about it…" />
                  </label>
                  <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  {status === "error" && <p className="font-semibold text-ball">{errorMsg}</p>}
                  <button type="submit" disabled={status === "sending"} className="btn-ball disabled:opacity-60">
                    {status === "sending" ? "Umpire is checking…" : "Appeal! Send it ☝️"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
