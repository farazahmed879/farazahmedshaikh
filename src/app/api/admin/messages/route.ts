import { adminRoute, json } from "@/lib/api";
import { MessageModel, serialize } from "@/lib/models";

export const GET = adminRoute(async () => {
  const messages = await MessageModel.find().sort({ createdAt: -1 }).limit(500).lean();
  return json(serialize(messages));
});
