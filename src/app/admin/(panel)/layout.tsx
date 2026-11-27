import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ToastProvider } from "@/components/admin/ui";
import Sidebar from "@/components/admin/Sidebar";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#03100a] bg-[radial-gradient(ellipse_at_top_right,rgba(29,122,74,0.12),transparent_55%)] text-white lg:flex">
        <Sidebar username={session.username} />
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-10 lg:py-12">
          <div className="mx-auto max-w-5xl">
            {session.isDefault && (
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm text-amber-100">
                <span>
                  ⚠️ You&apos;re signed in with a default or temporary password. Set your own password to keep the admin panel secure.
                </span>
                <Link href="/admin/account" className="rounded-xl bg-amber-400 px-4 py-2 font-semibold text-black transition hover:bg-amber-300">
                  Change password
                </Link>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
