import Link from "next/link";
import { connectDB } from "@/lib/db";
import { ensureSeeded } from "@/lib/content";
import { ExperienceModel, MessageModel, ProjectModel, SkillCategoryModel, serialize } from "@/lib/models";
import type { Message } from "@/lib/types";
import { Card, PageHeader } from "@/components/admin/ui";
import { STORY_SECTIONS } from "@/components/admin/storySections";

export default async function Dashboard() {
  let stats: { label: string; value: number; href: string }[] = [];
  let recent: Message[] = [];
  let dbError = "";
  try {
    await connectDB();
    await ensureSeeded();
    const [exp, proj, skills, msgs, unread, latest] = await Promise.all([
      ExperienceModel.countDocuments(),
      ProjectModel.countDocuments(),
      SkillCategoryModel.countDocuments(),
      MessageModel.countDocuments(),
      MessageModel.countDocuments({ read: false }),
      MessageModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
    stats = [
      { label: "Experience entries", value: exp, href: "/admin/experience" },
      { label: "Projects", value: proj, href: "/admin/projects" },
      { label: "Skill categories", value: skills, href: "/admin/skills" },
      { label: `Messages (${unread} unread)`, value: msgs, href: "/admin/messages" },
    ];
    recent = serialize<Message[]>(latest);
  } catch (err) {
    dbError = (err as Error).message;
  }

  return (
    <>
      <PageHeader eyebrow="Dashboard" title="Welcome back" description="Everything you change here goes live on your portfolio within seconds." />

      {dbError && (
        <Card className="mb-6 border-rose-500/30 bg-rose-500/10 text-sm text-rose-200">
          Could not connect to MongoDB: {dbError}
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition hover:border-amber/40">
            <p className="font-display text-4xl font-bold text-white">{s.value}</p>
            <p className="mt-1 text-sm text-white/50 group-hover:text-white/70">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Shortcuts
          title="Portfolio"
          site="/"
          links={[
            ["/admin/profile", "Profile, hero & sections"],
            ["/admin/experience", "Experience"],
            ["/admin/projects", "Projects"],
            ["/admin/skills", "Skills"],
          ]}
        />
        <Shortcuts title="Story page" site="/career" links={STORY_SECTIONS.map((s) => [`/admin/career/${s.slug}`, s.label])} />
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold tracking-wide uppercase">Latest messages</h2>
          <Link href="/admin/messages" className="text-sm text-amber hover:brightness-110">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-white/40">No messages yet. They&apos;ll appear here when visitors use your contact form.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {recent.map((m) => (
              <li key={m.id} className="flex items-start gap-3 py-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${m.read ? "bg-white/15" : "bg-amber"}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {m.name} <span className="font-normal text-white/40">· {m.subject || "No subject"}</span>
                  </p>
                  <p className="truncate text-sm text-white/45">{m.message}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

function Shortcuts({ title, site, links }: { title: string; site: string; links: string[][] }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold tracking-wide uppercase">{title}</h2>
        <a href={site} target="_blank" className="text-sm text-white/40 hover:text-amber">
          View on site ↗
        </a>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3 text-sm text-white/70 transition hover:border-amber/30 hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </Card>
  );
}
