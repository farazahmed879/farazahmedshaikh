"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { inputCls, PasswordInput, Spinner } from "@/components/admin/ui";
import { CricketBall } from "@/components/site/cricket";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      window.location.href = "/admin";
      return;
    }
    const body = await res.json().catch(() => ({}));
    setError(body.error || "Login failed");
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06060b] px-4">
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] animate-aurora rounded-full bg-[#1d7a4a]/30 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] animate-aurora rounded-full bg-amber/10 blur-3xl" />
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative w-full max-w-sm rounded-3xl p-8"
      >
        <div className="mb-8 text-center">
          <CricketBall className="mx-auto mb-4 h-12 w-12" />
          <h1 className="font-display text-3xl font-bold tracking-wide text-white uppercase">Admin panel</h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage your portfolio</p>
        </div>
        <div className="space-y-4">
          <input name="username" required autoComplete="username" placeholder="Username" className={inputCls} autoCapitalize="none" />
          <PasswordInput name="password" required autoComplete="current-password" placeholder="Password" />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber py-2.5 text-sm font-semibold text-[#03140d] transition hover:brightness-105 disabled:opacity-60"
          >
            {loading && <Spinner />} Sign in
          </button>
        </div>
        <a href="/" className="mt-6 block text-center text-xs text-white/40 hover:text-white/70">
          ← Back to site
        </a>
      </motion.form>
    </div>
  );
}
