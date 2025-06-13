import Review from "../../models/review.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";

export const addProductReview = asyncHandler(async (req, res) => {
  const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

  const order = await Order.findOne({
    userId,
    "cartItems.productId": productId,
    orderStatus: "confirmed",
  });

  if (!order)
    throw new AppError(403, "You need to purchase product to review it");

  const checkExistingReview = await Review.findOne({ productId, userId });

  if (checkExistingReview)
    throw new AppError(400, "You already reviewed this product");

  const newReview = new Review({
    productId,
    userId,
    userName,
    reviewMessage,
    reviewValue,
  });

  await newReview.save();

  const reviews = await Review.find({ productId });

  const totalReviewsLength = reviews.length;
  const averageReview =
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
    totalReviewsLength;

  await Product.findByIdAndUpdate(productId, { averageReview });

  res.status(201).json({
    success: true,
    data: newReview,
  });
});

export const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const reviews = await Review.find({ productId });

  res.status(200).json({
    success: true,
    data: reviews,
  });
});
