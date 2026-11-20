"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { inputCls, Spinner } from "@/components/admin/ui";

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
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] animate-aurora rounded-full bg-violet-600/25 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] animate-aurora rounded-full bg-cyan-500/15 blur-3xl" />
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative w-full max-w-sm rounded-3xl p-8"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-xl font-bold text-white">
            ✦
          </div>
          <h1 className="font-display text-2xl font-semibold text-white">Admin panel</h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage your portfolio</p>
        </div>
        <div className="space-y-4">
          <input name="username" required autoComplete="username" placeholder="Username" className={inputCls} autoCapitalize="none" />
          <input name="password" type="password" required autoComplete="current-password" placeholder="Password" className={inputCls} />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
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
