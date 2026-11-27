import { redirect } from "next/navigation";
import { STORY_SECTIONS } from "@/components/admin/storySections";

// The story page editor is split into sub-sections; open the first one.
export default function StoryAdminIndex() {
  redirect(`/admin/career/${STORY_SECTIONS[0].slug}`);
}
