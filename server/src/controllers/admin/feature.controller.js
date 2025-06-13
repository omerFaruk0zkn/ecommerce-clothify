import Feature from "../../models/feature.model.js";
import { deleteImageUtil } from "../../helpers/cloudinary.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";

export const addFeatureImage = asyncHandler(async (req, res) => {
  const { image } = req.body;

  const featureImages = new Feature({
    image,
  });

  await featureImages.save();

  res.status(201).json({
    success: true,
    data: featureImages,
  });
});

export const getFeatureImages = asyncHandler(async (req, res) => {
  const images = await Feature.find({});

  res.status(200).json({
    success: true,
    data: images,
  });
});

export const deleteFeatureImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const featureImage = await Feature.findByIdAndDelete(id);

  if (!featureImage) throw new AppError(404, "Feature image not found");

  await deleteImageUtil(featureImage.image);

  res.status(200).json({
    success: true,
    message: "Feature image is deleted successfully",
  });
});
