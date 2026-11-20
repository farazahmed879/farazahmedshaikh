import Link from "next/link";
import { connectDB } from "@/lib/db";
import { ensureSeeded } from "@/lib/content";
import { ExperienceModel, MessageModel, ProjectModel, SkillCategoryModel, serialize } from "@/lib/models";
import type { Message } from "@/lib/types";
import { Card, PageHeader } from "@/components/admin/ui";

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
      <PageHeader title="Welcome back 👋" description="Everything you change here goes live on your portfolio within seconds." />

      {dbError && (
        <Card className="mb-6 border-rose-500/30 bg-rose-500/10 text-sm text-rose-200">
          Could not connect to MongoDB: {dbError}
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition hover:border-violet-400/40">
            <p className="font-display text-4xl font-bold text-white">{s.value}</p>
            <p className="mt-1 text-sm text-white/50 group-hover:text-white/70">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-semibold">Latest messages</h2>
            <Link href="/admin/messages" className="text-sm text-violet-300 hover:text-violet-200">
              View all →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-white/40">No messages yet. They&apos;ll appear here when visitors use your contact form.</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {recent.map((m) => (
                <li key={m.id} className="flex items-start gap-3 py-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${m.read ? "bg-white/15" : "bg-violet-400"}`} />
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
        <Card>
          <h2 className="font-display mb-4 font-semibold">Quick actions</h2>
          <div className="space-y-2 text-sm">
            {[
              ["/admin/profile", "Edit hero, bio & contact info"],
              ["/admin/projects", "Add a new project"],
              ["/admin/experience", "Update your work history"],
              ["/admin/profile", "Show / hide sections"],
            ].map(([href, label]) => (
              <Link key={label} href={href} className="block rounded-xl border border-white/5 px-4 py-3 text-white/70 transition hover:bg-white/5 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
