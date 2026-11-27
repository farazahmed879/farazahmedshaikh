"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineExternalLink } from "react-icons/hi";
import { Button, Card, PageHeader, Spinner, api, useToast } from "./ui";
import { FieldsForm } from "./fields";
import { STORY_SECTIONS } from "./storySections";
import type { Story } from "@/lib/types";

/** Edits one sub-section of the story page. Saving sends the whole story, so nothing else is lost. */
export default function StoryEditor({ slug }: { slug: string }) {
  const index = STORY_SECTIONS.findIndex((s) => s.slug === slug);
  const section = STORY_SECTIONS[index];
  const prev = STORY_SECTIONS[index - 1];
  const next = STORY_SECTIONS[index + 1];

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
      toast(`${section.label} saved — your story page is updated`);
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  const actions = (
    <>
      <a
        href={`/career#${section.anchor}`}
        target="_blank"
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
      >
        View on site <HiOutlineExternalLink className="h-4 w-4" />
      </a>
      <Button onClick={save} disabled={saving || !story}>
        {saving && <Spinner />} Save changes
      </Button>
    </>
  );

  return (
    <>
      <PageHeader eyebrow={`Story page · ${index + 1} of ${STORY_SECTIONS.length}`} title={section.label} description={section.description} actions={actions} />
      {!story ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <FieldsForm fields={section.fields} value={story} onChange={setStory} />
          </Card>

          <div className="sticky bottom-3 z-10 flex items-center justify-between gap-2 rounded-2xl border border-white/[0.07] bg-[#061a11]/95 p-2 backdrop-blur sm:bottom-4 sm:p-3">
            <div className="flex min-w-0 gap-1 sm:gap-2">
              {prev && (
                <Link href={`/admin/career/${prev.slug}`} title={prev.label} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white">
                  <HiOutlineArrowLeft className="h-4 w-4 shrink-0" /> <span className="hidden sm:inline">{prev.label}</span>
                </Link>
              )}
              {next && (
                <Link href={`/admin/career/${next.slug}`} title={next.label} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white">
                  <span className="hidden sm:inline">{next.label}</span> <HiOutlineArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              )}
            </div>
            <Button onClick={save} disabled={saving}>
              {saving && <Spinner />} Save changes
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
