import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function imageUploadUtil(file, folder) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: `e-commerce-clothify/${folder}`,
  });

  return result;
}

export async function deleteImageUtil(url) {
  const baseUrl = "https://res.cloudinary.com/";

  if (!url.startsWith(baseUrl)) throw new Error("Geçersiz Cloudinary URL");

  const parts = url.split("/");

  const uploadIndex = parts.findIndex((p) => p === "upload");

  const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");

  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}

export default cloudinary;
