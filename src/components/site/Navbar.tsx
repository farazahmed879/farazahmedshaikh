"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { CricketBall } from "./cricket";

// `href` makes a link point to another page instead of a section on this one.
type Link = { id: string; label: string; href?: string };

export default function Navbar({
  brand,
  brandHref = "#home",
  links,
  resumeUrl,
}: {
  brand: string;
  brandHref?: string;
  links: Link[];
  resumeUrl: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // reading progress bar at the very top of the page
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links
      .filter((l) => !l.href)
      .forEach((l) => {
        const el = document.getElementById(l.id);
        if (el) observer.observe(el);
      });
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const all = [...links, ...(resumeUrl ? [{ id: "__resume", label: "Resume", href: resumeUrl }] : [])];

  return (
    <>
      <div ref={progressRef} style={{ transform: "scaleX(0)" }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-amber shadow-[0_0_12px_#ffb020] transition-transform duration-150 ease-out" />
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "board" : "border-2 border-transparent"
          }`}
        >
          <a href={brandHref} className="group flex items-center gap-2.5">
            <CricketBall className="h-7 w-7 transition-transform duration-700 group-hover:rotate-[360deg]" />
            <span className="font-display text-2xl font-black tracking-wide text-chalk uppercase">{brand}</span>
            <span className="cond hidden items-center gap-1.5 rounded-md border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] text-lime sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Live
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={link.href ?? `#${link.id}`}
                  className={`cond relative block px-3 py-2 text-[13px] transition-colors ${
                    active === link.id ? "text-amber" : "text-chalk/65 hover:text-chalk"
                  }`}
                >
                  {link.label}
                </a>
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-0.5 h-[3px] origin-center rounded-full bg-amber shadow-[0_0_10px_#ffb020] transition-transform duration-300 ${
                    active === link.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cond hidden rounded-full bg-chalk px-4 py-2 text-xs text-pitch-950 transition hover:-rotate-2 hover:bg-amber sm:inline-flex"
              >
                Resume ↗
              </a>
            )}
            <button onClick={() => setOpen(true)} className="rounded-full p-2 text-chalk lg:hidden" aria-label="Open menu">
              <HiOutlineMenuAlt4 className="h-7 w-7" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-pitch-800 bg-[repeating-linear-gradient(100deg,rgba(255,255,255,0.04)_0_80px,transparent_80px_160px)] px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="led text-sm">● Select your over</span>
              <button onClick={() => setOpen(false)} className="rounded-full bg-chalk p-2 text-pitch-950" aria-label="Close menu">
                <HiX className="h-6 w-6" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
              className="mt-10 flex flex-col"
            >
              {all.map((link, i) => (
                <motion.li key={link.id} variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } }}>
                  <a
                    href={link.href ?? `#${link.id}`}
                    target={link.id === "__resume" ? "_blank" : undefined}
                    rel={link.id === "__resume" ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b-2 border-dashed border-chalk/15 py-3"
                  >
                    <span className="led w-10 text-sm">0.{i + 1}</span>
                    <span className="font-display text-5xl font-black text-chalk uppercase">{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
