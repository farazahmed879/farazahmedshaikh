"use client";

import { useState } from "react";

/** How many items long lists show before the "View all" button. */
export const PREVIEW_COUNT = 6;

/**
 * Keeps long lists short: returns the items to render plus a small "View all / Show less" button.
 * When collapsing, it scrolls back to `sectionId` so the visitor doesn't land far below the list.
 */
export function useShowMore<T>(items: T[], noun: string, sectionId: string, limit = PREVIEW_COUNT) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > limit;
  const shown = expanded || !hasMore ? items : items.slice(0, limit);

  const toggle = () => {
    if (expanded) document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setExpanded(!expanded);
  };

  const button = hasMore ? (
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className="cond group inline-flex items-center gap-2 rounded-full border-2 border-chalk/40 px-5 py-2 text-xs text-chalk/80 transition hover:border-amber hover:bg-amber hover:text-pitch-950"
      >
        {expanded ? "Show less" : `View all ${items.length} ${noun}`}
        <span aria-hidden className={`transition-transform ${expanded ? "rotate-180" : "group-hover:translate-y-0.5"}`}>
          ↓
        </span>
      </button>
    </div>
  ) : null;

  return { shown, button };
}
