import type { Profile } from "@/lib/types";
import SocialIcon, { socialMeta } from "./SocialIcon";
import { CricketBall } from "./cricket";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="relative z-10 px-4 pt-10 pb-8 sm:px-6">
      <div className="board dotmatrix mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <CricketBall className="h-10 w-10" />
            <div>
              <p className="font-display text-3xl font-black text-chalk uppercase">{profile.name}</p>
              <p className="led text-xs">
                © {new Date().getFullYear()} · All rights reserved
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.platform + s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialMeta(s.platform).label}
                className="text-chalk/50 transition hover:-translate-y-0.5 hover:text-amber"
              >
                <SocialIcon platform={s.platform} className="h-5 w-5" />
              </a>
            ))}
          </div>
          <a href="#" className="cond text-xs text-chalk/60 transition hover:text-amber">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
