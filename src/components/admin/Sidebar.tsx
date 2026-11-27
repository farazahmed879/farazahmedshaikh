"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
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
  HiOutlineIdentification,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineHeart,
  HiOutlineFlag,
  HiOutlinePhotograph,
  HiOutlineShare,
  HiOutlineX,
} from "react-icons/hi";
import { CricketBall } from "@/components/site/cricket";
import { STORY_SECTIONS } from "./storySections";

type NavLink = { href: string; label: string; Icon: IconType };

const STORY_ICONS: Record<string, IconType> = {
  intro: HiOutlineIdentification,
  "main-events": HiOutlineStar,
  chapters: HiOutlineClock,
  education: HiOutlineAcademicCap,
  passions: HiOutlineHeart,
  goals: HiOutlineFlag,
  gallery: HiOutlinePhotograph,
  connect: HiOutlineShare,
};

const groups: { title: string; site?: string; links: NavLink[] }[] = [
  {
    title: "Portfolio",
    site: "/",
    links: [
      { href: "/admin/profile", label: "Profile & sections", Icon: HiOutlineUser },
      { href: "/admin/experience", label: "Experience", Icon: HiOutlineBriefcase },
      { href: "/admin/projects", label: "Projects", Icon: HiOutlineCollection },
      { href: "/admin/skills", label: "Skills", Icon: HiOutlineLightningBolt },
    ],
  },
  {
    title: "Story page",
    site: "/career",
    links: STORY_SECTIONS.map((s) => ({ href: `/admin/career/${s.slug}`, label: s.label, Icon: STORY_ICONS[s.slug] ?? HiOutlineStar })),
  },
  {
    title: "Inbox & account",
    links: [
      { href: "/admin/messages", label: "Messages", Icon: HiOutlineInbox },
      { href: "/admin/account", label: "Account & password", Icon: HiOutlineKey },
    ],
  },
];

export default function Sidebar({ username }: { username: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const item = ({ href, label, Icon }: NavLink, exact = false) => {
    const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
    return (
      <li key={href} className="relative">
        {active && <motion.span layoutId="admin-nav" className="absolute inset-0 rounded-lg bg-amber/10 ring-1 ring-amber/25" />}
        <Link
          href={href}
          onClick={() => setOpen(false)}
          aria-current={active ? "page" : undefined}
          className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${active ? "text-white" : "text-white/55 hover:bg-white/[0.04] hover:text-white"}`}
        >
          <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber" : "text-white/40"}`} />
          <span className="truncate">{label}</span>
        </Link>
      </li>
    );
  };

  const nav = (
    <nav className="flex h-full flex-col">
      <div className="mb-6 flex items-center gap-3 px-2">
        <CricketBall className="h-9 w-9 shrink-0" />
        <div className="min-w-0">
          <p className="font-display text-base leading-tight font-bold tracking-wide uppercase">Portfolio CMS</p>
          <p className="truncate text-xs text-white/40">@{username}</p>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close menu" className="ml-auto rounded-lg p-1.5 text-white/50 hover:bg-white/10 lg:hidden">
          <HiOutlineX className="h-5 w-5" />
        </button>
      </div>

      <div className="-mx-1 flex-1 space-y-6 overflow-y-auto px-1 pb-4">
        <ul>{item({ href: "/admin", label: "Dashboard", Icon: HiOutlineViewGrid }, true)}</ul>

        {groups.map((g) => (
          <div key={g.title}>
            <div className="mb-1.5 flex items-center justify-between px-3">
              <p className="cond text-[11px] tracking-[0.14em] text-white/35 uppercase">{g.title}</p>
              {g.site && (
                <a href={g.site} target="_blank" className="text-white/25 transition hover:text-amber" aria-label={`Open the ${g.title.toLowerCase()} on the site`} title="View on site">
                  <HiOutlineExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <ul className={`space-y-0.5 ${g.title === "Story page" ? "ml-3 border-l border-white/[0.07] pl-2" : ""}`}>{g.links.map((l) => item(l))}</ul>
          </div>
        ))}
      </div>

      <div className="space-y-0.5 border-t border-white/[0.06] pt-4">
        <a href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/[0.04] hover:text-white">
          <HiOutlineExternalLink className="h-[18px] w-[18px] text-white/40" /> View site
        </a>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/[0.04] hover:text-rose-300">
          <HiOutlineLogout className="h-[18px] w-[18px] text-white/40" /> Log out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-[#04150e]/95 px-5 py-3 backdrop-blur lg:hidden">
        <span className="flex items-center gap-2.5">
          <CricketBall className="h-7 w-7" />
          <span className="font-display font-bold tracking-wide uppercase">Portfolio CMS</span>
        </span>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-lg p-2 hover:bg-white/10">
          <HiOutlineMenuAlt2 className="h-6 w-6" />
        </button>
      </div>
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/[0.06] bg-[#04150e] p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {nav}
      </aside>
    </>
  );
}
