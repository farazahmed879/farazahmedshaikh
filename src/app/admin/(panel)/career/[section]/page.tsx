import { notFound } from "next/navigation";
import StoryEditor from "@/components/admin/StoryEditor";
import { storySection } from "@/components/admin/storySections";

export default async function StorySectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!storySection(section)) notFound();
  return <StoryEditor slug={section} />;
}
