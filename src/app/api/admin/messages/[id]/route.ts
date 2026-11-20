import { adminRoute, error, json } from "@/lib/api";
import { MessageModel, serialize } from "@/lib/models";

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = adminRoute<Ctx>(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  const doc = await MessageModel.findByIdAndUpdate(id, { read: Boolean(body.read) }, { new: true }).lean();
  return doc ? json(serialize(doc)) : error("Not found", 404);
});

export const DELETE = adminRoute<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  await MessageModel.findByIdAndDelete(id);
  return json({ ok: true });
});
