import { adminRoute, error, json, refreshSite } from "@/lib/api";
import { getCollection } from "@/lib/models";

type Ctx = { params: Promise<{ collection: string }> };

export const POST = adminRoute<Ctx>(async (req, { params }) => {
  const Model = getCollection((await params).collection);
  if (!Model) return error("Unknown collection", 404);
  const { ids } = await req.json();
  if (!Array.isArray(ids)) return error("ids must be an array");
  await Model.bulkWrite(
    ids.map((id: string, index: number) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
    }))
  );
  refreshSite();
  return json({ ok: true });
});
