import Order from "../../models/order.model.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";

export const getAllOrdersOfAllUsers = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (!orders.length) throw new AppError(404, "No orders found");

  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const getOrderDetailsForAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) throw new AppError(404, "Order not found");

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const order = await Order.findById(id);

  if (!order) throw new AppError(404, "Order not found");

  await Order.findByIdAndUpdate(id, { orderStatus });

  res.status(200).json({
    success: true,
    message: "Order status is updated successfully",
  });
});
