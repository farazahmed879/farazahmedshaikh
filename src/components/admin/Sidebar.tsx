"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineCollection,
  HiOutlineLightningBolt,
  HiOutlineInbox,
  HiOutlineExternalLink,
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineKey,
  HiOutlineSparkles,
} from "react-icons/hi";

const links = [
  { href: "/admin", label: "Dashboard", Icon: HiOutlineViewGrid },
  { href: "/admin/profile", label: "Profile & sections", Icon: HiOutlineUser },
  { href: "/admin/experience", label: "Experience", Icon: HiOutlineBriefcase },
  { href: "/admin/projects", label: "Projects", Icon: HiOutlineCollection },
  { href: "/admin/skills", label: "Skills", Icon: HiOutlineLightningBolt },
  { href: "/admin/career", label: "My story page", Icon: HiOutlineSparkles },
  { href: "/admin/messages", label: "Messages", Icon: HiOutlineInbox },
  { href: "/admin/account", label: "Account & password", Icon: HiOutlineKey },
];

export default function Sidebar({ username }: { username: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const nav = (
    <nav className="flex h-full flex-col">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 font-bold">✦</div>
        <div>
          <p className="font-display text-sm font-semibold">Portfolio CMS</p>
          <p className="max-w-[150px] truncate text-xs text-white/40">@{username}</p>
        </div>
      </div>
      <ul className="space-y-1">
        {links.map(({ href, label, Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href} className="relative">
              {active && (
                <motion.span layoutId="admin-nav" className="absolute inset-0 rounded-xl bg-white/[0.07] ring-1 ring-white/10" />
              )}
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-violet-300" : ""}`} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto space-y-1 pt-8">
        <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition hover:text-white">
          <HiOutlineExternalLink className="h-5 w-5" /> View site
        </a>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition hover:text-rose-300">
          <HiOutlineLogout className="h-5 w-5" /> Log out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 lg:hidden">
        <span className="font-display font-semibold">Portfolio CMS</span>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-lg p-2 hover:bg-white/10">
          <HiOutlineMenuAlt2 className="h-6 w-6" />
        </button>
      </div>
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#09090f] p-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {nav}
      </aside>
    </>
  );
}
