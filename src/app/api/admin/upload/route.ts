import { adminRoute, error, json } from "@/lib/api";
import { MediaModel } from "@/lib/models";

const MAX_BYTES = 4 * 1024 * 1024; // stays under serverless request-body limits
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif", "application/pdf"];

export const POST = adminRoute(async (req) => {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return error("No file uploaded");
  if (!ALLOWED.includes(file.type)) return error("Only images (PNG, JPG, WebP, GIF, AVIF) and PDFs are allowed");
  if (file.size > MAX_BYTES) return error("File is too large (max 4 MB)");
  const data = Buffer.from(await file.arrayBuffer());
  const media = await MediaModel.create({ filename: file.name, contentType: file.type, size: file.size, data });
  return json({ url: `/api/media/${media._id}` });
});
