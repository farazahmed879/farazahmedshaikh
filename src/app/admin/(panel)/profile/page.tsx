"use client";

import { useEffect, useState } from "react";
import { Button, Card, PageHeader, Spinner, api, useToast } from "@/components/admin/ui";
import { FieldsForm, type Field } from "@/components/admin/fields";
import type { Profile } from "@/lib/types";

const groups: { title: string; description: string; fields: Field[] }[] = [
  {
    title: "Hero",
    description: "The first thing visitors see.",
    fields: [
      { name: "name", label: "Full name", type: "text" },
      { name: "shortName", label: "Navbar brand", type: "text", help: "Shown next to the cricket ball in the navbar." },
      { name: "roles", label: "Rotating roles", type: "tags", help: "Typed out one after another under your name." },
      { name: "tagline", label: "Tagline", type: "textarea", rows: 2 },
      { name: "availabilityText", label: "Availability badge", type: "text", placeholder: "Open to new opportunities" },
      { name: "availableForWork", label: "Available for work (green pulse)", type: "boolean" },
      {
        name: "photos",
        label: "Player card photos",
        type: "images",
        max: 3,
        help: "Up to 3 photos — they fade from one to the next on your player card. The first one is your main photo. Portrait (4:5) photos look best.",
      },
      { name: "socials", label: "Social links", type: "socials" },
    ],
  },
  {
    title: "About",
    description: "Your story and headline numbers.",
    fields: [
      { name: "aboutHeading", label: "Heading", type: "text", full: true },
      { name: "bio", label: "Bio", type: "textarea", rows: 7, help: "Leave a blank line between paragraphs." },
      { name: "location", label: "Location", type: "text" },
      { name: "resumeUrl", label: "Resume", type: "file", help: "Upload a PDF or paste a link (e.g. Google Drive)." },
      { name: "stats", label: "Stats", type: "stats", help: "Numbers animate when they scroll into view." },
    ],
  },
  {
    title: "Contact",
    description: "Shown above the contact form.",
    fields: [
      { name: "contactHeading", label: "Heading", type: "text", full: true },
      { name: "contactMessage", label: "Message", type: "textarea", rows: 3 },
      { name: "email", label: "Public email", type: "email" },
    ],
  },
  {
    title: "Sections & GitHub",
    description: "Turn whole sections on or off.",
    fields: [
      {
        name: "sections",
        label: "Visible sections",
        type: "toggles",
        options: [
          { key: "about", label: "About" },
          { key: "experience", label: "Experience" },
          { key: "projects", label: "Projects" },
          { key: "skills", label: "Skills" },
          { key: "github", label: "GitHub repos" },
          { key: "contact", label: "Contact" },
        ],
      },
      { name: "githubUsername", label: "GitHub username", type: "text" },
      { name: "githubRepoCount", label: "Repos to show", type: "number", help: "Most recently pushed, forks excluded." },
    ],
  },
  {
    title: "SEO",
    description: "How the site appears in search and link previews.",
    fields: [
      { name: "seoTitle", label: "Page title", type: "text", full: true },
      { name: "seoDescription", label: "Meta description", type: "textarea", rows: 2 },
    ],
  },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    api<Profile>("/api/admin/profile")
      // older profiles only have the single `photo`; show it as the first carousel photo
      .then((p) => setProfile({ ...p, photos: p.photos?.length ? p.photos : p.photo ? [p.photo] : [] }))
      .catch((e) => toast(e.message, "error"));
  }, [toast]);

  async function save() {
    if (!profile) return;
    setSaving(true);
    try {
      const photos = (profile.photos ?? []).filter(Boolean).slice(0, 3);
      const cleaned = { ...profile, roles: profile.roles.filter(Boolean), photos, photo: photos[0] ?? "" };
      const saved = await api<Profile>("/api/admin/profile", { method: "PUT", json: cleaned });
      setProfile({ ...saved, photos: saved.photos?.length ? saved.photos : saved.photo ? [saved.photo] : [] });
      toast("Profile saved — your site is updated");
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  const saveBtn = (
    <Button onClick={save} disabled={saving || !profile}>
      {saving && <Spinner />} Save changes
    </Button>
  );

  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Profile & sections" description="Hero, about, contact details, visibility and SEO." actions={saveBtn} />
      {!profile ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((g) => (
            <Card key={g.title}>
              <div className="mb-5">
                <h2 className="font-display text-lg font-semibold">{g.title}</h2>
                <p className="text-sm text-white/45">{g.description}</p>
              </div>
              <FieldsForm fields={g.fields} value={profile} onChange={setProfile} />
            </Card>
          ))}
          <div className="sticky bottom-4 flex justify-end">{saveBtn}</div>
        </div>
      )}
    </>
  );
}
