"use client";

import { useEffect, useState } from "react";
import { Button, Card, PageHeader, Spinner, api, useToast } from "@/components/admin/ui";
import { FieldsForm, type Field } from "@/components/admin/fields";
import type { Story } from "@/lib/types";

const groups: { title: string; description: string; fields: Field[] }[] = [
  {
    title: "Page settings",
    description: "The page lives at /career and is linked from your portfolio's navbar and About section.",
    fields: [
      { name: "enabled", label: "Show this page", type: "boolean" },
      { name: "navLabel", label: "Menu label", type: "text", placeholder: "My Story" },
    ],
  },
  {
    title: "Intro",
    description: "Who you are, in your own words.",
    fields: [
      { name: "eyebrow", label: "Small label above the title", type: "text" },
      { name: "title", label: "Title", type: "text", help: "Wrap words in *asterisks* to highlight them in amber." },
      { name: "intro", label: "Introduction", type: "textarea", rows: 6, help: "Leave a blank line between paragraphs." },
      { name: "quote", label: "Favourite quote / motto", type: "text" },
      { name: "quoteAuthor", label: "Quote author", type: "text" },
    ],
  },
  {
    title: "Main events",
    description:
      "The big things that define you, shown as large panels right after the intro. Quotes and photos rotate when there's more than one.",
    fields: [
      {
        name: "spotlights",
        label: "Main events",
        type: "list",
        itemLabel: "Main event",
        itemFields: [
          { name: "emoji", label: "Emoji", type: "text", narrow: true, placeholder: "🏋️" },
          { name: "eyebrow", label: "Small label", type: "text", placeholder: "Daily discipline" },
          { name: "title", label: "Title", type: "text", placeholder: "Health & *fitness*" },
          { name: "text", label: "Story", type: "textarea" },
          { name: "points", label: "Key points (one per line)", type: "textarea" },
          { name: "quotes", label: "Quotes (one per line, as: Quote — Author)", type: "textarea" },
          { name: "photos", label: "Photos", type: "images", help: "Shown as a small carousel. Up to 4 MB each — you can pick several at once." },
        ],
      },
    ],
  },
  {
    title: "Life chapters",
    description: "The key moments of your journey, in order.",
    fields: [
      {
        name: "chapters",
        label: "Chapters",
        type: "list",
        itemLabel: "Chapter",
        itemFields: [
          { name: "year", label: "Year / period", type: "text", narrow: true, placeholder: "2017" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Story", type: "textarea" },
        ],
      },
    ],
  },
  {
    title: "Education",
    description: "Schools, college, university, courses and certifications.",
    fields: [
      {
        name: "education",
        label: "Education",
        type: "list",
        itemLabel: "Entry",
        itemFields: [
          { name: "period", label: "Period", type: "text", narrow: true, placeholder: "2013 — 2017" },
          { name: "institution", label: "Institution", type: "text" },
          { name: "degree", label: "Degree / programme", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    title: "Hobbies & passions",
    description:
      "Fill in “Longer story” to make a passion a big featured pillar card; leave it empty for a small card. The emojis also appear as stickers around your player card.",
    fields: [
      {
        name: "passions",
        label: "Passions",
        type: "list",
        itemLabel: "Passion",
        itemFields: [
          { name: "emoji", label: "Emoji", type: "text", narrow: true, placeholder: "🏏" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Short description", type: "textarea" },
          { name: "details", label: "Longer story (optional, makes it a big featured card)", type: "textarea" },
        ],
      },
      { name: "funFacts", label: "Fun facts", type: "lines", help: "One per line." },
    ],
  },
  {
    title: "Future & dream",
    description: "Your goals and the big dream.",
    fields: [
      {
        name: "goals",
        label: "Goals",
        type: "list",
        itemLabel: "Goal",
        itemFields: [
          { name: "horizon", label: "When", type: "text", narrow: true, placeholder: "Next 2 years" },
          { name: "title", label: "Goal", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
      { name: "dreamTitle", label: "Dream headline", type: "text", full: true, help: "Wrap words in *asterisks* to highlight them in amber." },
      { name: "dreamText", label: "Dream description", type: "textarea", rows: 4 },
    ],
  },
  {
    title: "Photo gallery",
    description: "Optional — moments from your life. Hidden when empty.",
    fields: [
      {
        name: "gallery",
        label: "Photos",
        type: "list",
        itemLabel: "Photo",
        itemFields: [
          { name: "image", label: "Image", type: "image" },
          { name: "caption", label: "Caption", type: "text" },
        ],
      },
    ],
  },
  {
    title: "Connect",
    description: "Social links come from Profile & sections.",
    fields: [
      { name: "connectTitle", label: "Heading", type: "text", full: true },
      { name: "connectText", label: "Text", type: "textarea", rows: 2 },
    ],
  },
];

export default function CareerAdmin() {
  const [story, setStory] = useState<Story | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    api<Story>("/api/admin/story")
      .then(setStory)
      .catch((e) => toast(e.message, "error"));
  }, [toast]);

  async function save() {
    if (!story) return;
    setSaving(true);
    try {
      const filled = (v: unknown) => (typeof v === "string" ? v.trim() !== "" : Array.isArray(v) && v.length > 0);
      const nonEmpty = <T extends object>(list: T[]) => list.filter((x) => Object.values(x).some(filled));
      const cleaned = {
        ...story,
        spotlights: nonEmpty(story.spotlights ?? []),
        chapters: nonEmpty(story.chapters),
        education: nonEmpty(story.education),
        passions: nonEmpty(story.passions),
        goals: nonEmpty(story.goals),
        gallery: story.gallery.filter((g) => g.image),
        funFacts: story.funFacts.map((f) => f.trim()).filter(Boolean),
      };
      setStory(await api<Story>("/api/admin/story", { method: "PUT", json: cleaned }));
      toast("Saved — your story page is updated");
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  const actions = (
    <>
      <a href="/career" target="_blank" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
        View page ↗
      </a>
      <Button onClick={save} disabled={saving || !story}>
        {saving && <Spinner />} Save changes
      </Button>
    </>
  );

  return (
    <>
      <PageHeader title="My story page" description="Your life beyond work — education, passions, goals and dreams." actions={actions} />
      {!story ? (
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
              <FieldsForm fields={g.fields} value={story} onChange={setStory} />
            </Card>
          ))}
          <div className="sticky bottom-4 flex justify-end">
            <Button onClick={save} disabled={saving}>
              {saving && <Spinner />} Save changes
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
