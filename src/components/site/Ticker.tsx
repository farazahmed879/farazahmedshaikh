import { CricketBall } from "./cricket";

/** Two crossing broadcast "breaking news" tapes. */
export default function Ticker({ items, secondary }: { items: string[]; secondary: string[] }) {
  if (!items.length) return null;
  const loop = (list: string[]) => [...list, ...list];
  return (
    <div aria-hidden className="relative z-10 -my-4 overflow-hidden py-10">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2deg] border-y-2 border-pitch-950 bg-chalk py-2.5">
        <div className="animate-marquee-rev flex w-max gap-8">
          {loop(secondary.length ? secondary : items).map((t, i) => (
            <span key={i} className="cond flex items-center gap-8 text-sm whitespace-nowrap text-pitch-950">
              {t} <span>✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="relative -rotate-[1.5deg] border-y-2 border-pitch-950 bg-amber shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
        <div className="flex items-stretch">
          <span className="cond relative z-10 flex shrink-0 items-center gap-2 bg-ball px-4 py-3 text-sm text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Breaking
          </span>
          <div className="overflow-hidden">
            <div className="animate-marquee flex w-max items-center gap-6 py-3 pl-6">
              {loop(items).map((t, i) => (
                <span key={i} className="cond flex items-center gap-6 text-base whitespace-nowrap text-pitch-950">
                  {t}
                  <CricketBall className="h-5 w-5" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
