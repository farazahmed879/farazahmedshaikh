import { adminRoute, cleanBody, error, json, refreshSite } from "@/lib/api";
import { getCollection, serialize } from "@/lib/models";

type Ctx = { params: Promise<{ collection: string; id: string }> };

export const PUT = adminRoute<Ctx>(async (req, { params }) => {
  const { collection, id } = await params;
  const Model = getCollection(collection);
  if (!Model) return error("Unknown collection", 404);
  const body = cleanBody(await req.json());
  const doc = await Model.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true }).lean();
  if (!doc) return error("Not found", 404);
  refreshSite();
  return json(serialize(doc));
});

export const DELETE = adminRoute<Ctx>(async (_req, { params }) => {
  const { collection, id } = await params;
  const Model = getCollection(collection);
  if (!Model) return error("Unknown collection", 404);
  await Model.findByIdAndDelete(id);
  refreshSite();
  return json({ ok: true });
});
