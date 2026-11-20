import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { MediaModel } from "@/lib/models";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isValidObjectId(id)) return new Response("Not found", { status: 404 });
  await connectDB();
  const media = await MediaModel.findById(id).lean<{ data: any; contentType: string; filename: string }>();
  if (!media) return new Response("Not found", { status: 404 });
  // lean() may return a BSON Binary instead of a Buffer
  const raw = media.data;
  const bytes: Uint8Array = Buffer.isBuffer(raw) ? raw : raw?.buffer ? new Uint8Array(raw.buffer) : new Uint8Array(raw);
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": media.contentType,
      "Content-Disposition": `inline; filename="${encodeURIComponent(media.filename || "file")}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
