import { adminRoute, cleanBody, error, json, refreshSite } from "@/lib/api";
import { getCollection, serialize } from "@/lib/models";
import { ensureSeeded } from "@/lib/content";

type Ctx = { params: Promise<{ collection: string }> };

export const GET = adminRoute<Ctx>(async (_req, { params }) => {
  const Model = getCollection((await params).collection);
  if (!Model) return error("Unknown collection", 404);
  await ensureSeeded();
  const docs = await Model.find().sort({ order: 1, createdAt: 1 }).lean();
  return json(serialize(docs));
});

export const POST = adminRoute<Ctx>(async (req, { params }) => {
  const Model = getCollection((await params).collection);
  if (!Model) return error("Unknown collection", 404);
  const body = cleanBody(await req.json());
  const last = await Model.findOne().sort({ order: -1 }).lean<{ order?: number }>();
  const doc = await Model.create({ ...body, order: (last?.order ?? -1) + 1 });
  refreshSite();
  return json(serialize(doc.toObject()), 201);
});
