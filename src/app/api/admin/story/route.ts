import { adminRoute, cleanBody, json, refreshSite } from "@/lib/api";
import { getStory } from "@/lib/content";
import { StoryModel } from "@/lib/models";

export const GET = adminRoute(async () => json(await getStory()));

export const PUT = adminRoute(async (req) => {
  await getStory(); // make sure the document exists
  const body = cleanBody(await req.json());
  await StoryModel.findOneAndUpdate({}, { $set: body }, { runValidators: true });
  refreshSite();
  return json(await getStory());
});
