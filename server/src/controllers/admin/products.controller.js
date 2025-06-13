import Product from "../../models/product.model.js";
import cloudinary from "../../helpers/cloudinary.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";
import { deleteImageUtil, imageUploadUtil } from "../../helpers/cloudinary.js";

// add a new product image
export const handleImageUpload = asyncHandler(async (req, res) => {
  if (!req.file || !req.file.buffer) {
    throw new AppError(
      400,
      "The file was not uploaded or a corrupted file was sent"
    );
  }

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const url = `data:${req.file.mimetype};base64,${b64}`;
  const result = await imageUploadUtil(url, "products");

  if (!result || !result.secure_url) {
    throw new AppError(500, "Image could not be loaded, please try again.");
  }

  res.status(200).json({
    success: true,
    result: {
      secure_url: result.secure_url,
      publicId: result.public_id,
    },
  });
});

export const handleImageDelete = asyncHandler(async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) throw new AppError(400, "Public ID is required");

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok") throw new AppError(500, "Failed to delete image");

  return res
    .status(200)
    .json({ success: true, message: "Image deleted successfully" });
});

// add a new product
export const addProduct = asyncHandler(async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  if (
    !image ||
    !title ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !totalStock
  ) {
    throw new AppError(400, "All fields are required without sale price");
  }

  if (title.length < 3 || title.length > 100) {
    throw new AppError(
      400,
      "Title must be at least 3 and at most 100 characters"
    );
  }

  if (description.length < 10) {
    throw new AppError(400, "Description must be at least 10 characters");
  }

  if (price < 0) {
    throw new AppError(400, "Price must be a positive number");
  }

  if (salePrice < 0) {
    throw new AppError(400, "Sale price must be a positive number");
  }

  if (salePrice > price) {
    throw new AppError(
      400,
      "Sale price must be less than or equal to the original price"
    );
  }

  if (totalStock < 0) {
    throw new AppError(400, "Total stock cannot be negative");
  }

  const newCreatedProduct = new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  });

  await newCreatedProduct.save();

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    data: newCreatedProduct,
  });
});

// fetch all products
export const fetchAllProducts = asyncHandler(async (req, res) => {
  const listOfProducts = await Product.find({});
  res.status(200).json({
    success: true,
    data: listOfProducts,
  });
});

// edit a product
export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  if (
    !image ||
    !title ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !totalStock
  ) {
    throw new AppError(400, "All fields are required without sale price");
  }

  if (title.length < 3 || title.length > 100) {
    throw new AppError(
      400,
      "Title must be at least 3 and at most 100 characters"
    );
  }

  if (description.length < 10) {
    throw new AppError(400, "Description must be at least 10 characters");
  }

  if (price < 0) {
    throw new AppError(400, "Price must be a positive number");
  }

  if (salePrice < 0) {
    throw new AppError(400, "Sale price must be a positive number");
  }

  if (salePrice > price) {
    throw new AppError(
      400,
      "Sale price must be less than or equal to the original price"
    );
  }

  if (totalStock < 0) {
    throw new AppError(400, "Total stock cannot be negative");
  }

  const product = await Product.findById(id);

  if (!product) throw new AppError(404, "Product not found");

  if (image && product.image && image !== product.image) {
    await deleteImageUtil(product.image);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      ...(image && { image }),
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      ...(brand && { brand }),
      ...(price && { price: price === "" ? 0 : price }),
      ...(salePrice !== undefined && {
        salePrice: salePrice === "" ? 0 : salePrice,
      }),
      ...(totalStock && {
        totalStock: totalStock === "" ? 0 : totalStock,
      }),
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

// delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) throw new AppError(404, "Product not found");

  await deleteImageUtil(product.image);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
