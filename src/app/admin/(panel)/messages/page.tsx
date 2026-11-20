"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Card, PageHeader, Spinner, api, useToast } from "@/components/admin/ui";
import type { Message } from "@/lib/types";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    api<Message[]>("/api/admin/messages")
      .then(setMessages)
      .catch((e) => toast(e.message, "error"));
  }, [toast]);

  async function setRead(m: Message, read: boolean) {
    const updated = await api<Message>(`/api/admin/messages/${m.id}`, { method: "PATCH", json: { read } });
    setMessages((list) => list!.map((x) => (x.id === m.id ? updated : x)));
  }

  async function toggle(m: Message) {
    setOpen(open === m.id ? null : m.id);
    if (!m.read) setRead(m, true).catch(() => {});
  }

  async function remove(m: Message) {
    if (!confirm(`Delete message from ${m.name}?`)) return;
    try {
      await api(`/api/admin/messages/${m.id}`, { method: "DELETE" });
      setMessages((list) => list!.filter((x) => x.id !== m.id));
      toast("Message deleted");
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  const unread = messages?.filter((m) => !m.read).length ?? 0;

  return (
    <>
      <PageHeader title="Messages" description={messages ? `${messages.length} total · ${unread} unread` : "From your contact form"} />
      {!messages ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : messages.length === 0 ? (
        <Card className="py-16 text-center text-white/50">Your inbox is empty.</Card>
      ) : (
        <ul className="space-y-2">
          {messages.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
              <button onClick={() => toggle(m)} className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-white/[0.03]">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${m.read ? "bg-white/10" : "bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]"}`} />
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm ${m.read ? "text-white/70" : "font-semibold text-white"}`}>
                    {m.name} <span className="font-normal text-white/40">&lt;{m.email}&gt;</span>
                  </p>
                  <p className="truncate text-sm text-white/45">
                    {m.subject ? <span className="text-white/65">{m.subject} — </span> : null}
                    {m.message}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-white/35">{new Date(m.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</time>
              </button>
              <AnimatePresence initial={false}>
                {open === m.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="border-t border-white/5 p-5">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-white/80">{m.message}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <a
                          href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "your message"))}`}
                          className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white"
                        >
                          Reply by email
                        </a>
                        <Button variant="ghost" onClick={() => setRead(m, !m.read)}>
                          Mark as {m.read ? "unread" : "read"}
                        </Button>
                        <Button variant="danger" onClick={() => remove(m)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
