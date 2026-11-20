import { adminRoute, cleanBody, json, refreshSite } from "@/lib/api";
import { ensureSeeded, getProfile } from "@/lib/content";
import { ProfileModel } from "@/lib/models";

export const GET = adminRoute(async () => json(await getProfile()));

export const PUT = adminRoute(async (req) => {
  await ensureSeeded();
  const body = cleanBody(await req.json());
  await ProfileModel.findOneAndUpdate({}, { $set: body }, { upsert: true, runValidators: true });
  refreshSite();
  return json(await getProfile());
});
