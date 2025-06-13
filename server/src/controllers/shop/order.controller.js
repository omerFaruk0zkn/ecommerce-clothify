import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";
import { stripe } from "../../helpers/stripe.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    userId,
    cartItems,
    addressInfo,
    orderStatus,
    paymentStatus,
    totalAmount,
    orderDate,
    orderUpdateDate,
    cartId,
  } = req.body;

  const newlyCreatedOrder = new Order({
    userId,
    cartId,
    cartItems,
    addressInfo,
    orderStatus,
    paymentMethod: "stripe",
    paymentStatus,
    totalAmount,
    orderDate,
    orderUpdateDate,
  });

  await newlyCreatedOrder.save();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.CLIENT_URL}/shop/stripe-return?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/shop/stripe-cancel`,
    metadata: {
      orderId: newlyCreatedOrder._id.toString(),
    },
  });

  res.status(201).json({
    success: true,
    checkoutURL: session.url,
    orderId: newlyCreatedOrder._id,
  });
});

export const capturePayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const orderId = session.metadata.orderId;
  let order = await Order.findById(orderId);

  if (!order) throw new AppError(404, "Order not found");

  order.paymentStatus = "paid";
  order.orderStatus = "confirmed";

  for (let item of order.cartItems) {
    let product = await Product.findById(item.productId);

    if (!product || product.totalStock < item.quantity) {
      throw new AppError(
        400,
        `Not enough stock for ${product?.title || "unknow product"}`
      );
    }

    product.totalStock -= item.quantity;
    await product.save();
  }

  await Cart.findByIdAndDelete(order.cartId);
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order confirmed and payment successfully",
    data: order,
  });
});

export const getAllOrdersByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ userId }).sort({ orderDate: -1 });

  if (!orders.length) {
    throw new AppError(404, "No orders found");
  }

  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) throw new AppError(404, "Order not found");

  res.status(200).json({
    success: true,
    data: order,
  });
});
