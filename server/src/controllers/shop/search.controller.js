import Product from "../../models/product.model.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";

export const searchProducts = asyncHandler(async (req, res) => {
  const { keyword } = req.params;

  if (!keyword || typeof keyword !== "string")
    throw new AppError(400, "Keyword is required and must be in string format");

  const regEx = new RegExp(keyword, "i");

  const createSearchQuery = {
    $or: [
      { title: regEx },
      { description: regEx },
      { category: regEx },
      { brand: regEx },
    ],
  };

  const searchResults = await Product.find(createSearchQuery);

  res.status(200).json({
    success: true,
    data: searchResults,
  });
});
