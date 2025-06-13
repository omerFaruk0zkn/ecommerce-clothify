import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url'

import { connectDB } from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import authRoute from "./routes/auth/auth.route.js";

import adminProductsRoute from "./routes/admin/products.route.js";
import adminOrderRoute from "./routes/admin/order.route.js";

import shopProductsRoute from "./routes/shop/products.route.js";
import shopCartRoute from "./routes/shop/cart.route.js";
import shopAddressRoute from "./routes/shop/address.route.js";
import shopOrderRoute from "./routes/shop/order.route.js";
import shopSearchRoute from "./routes/shop/search.route.js";
import shopReviewRoute from "./routes/shop/review.route.js";

import commonFeatureRoute from "./routes/common/feature.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

__filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);

app.use("/api/admin/products", adminProductsRoute);
app.use("/api/admin/orders", adminOrderRoute);

app.use("/api/shop/products", shopProductsRoute);
app.use("/api/shop/cart", shopCartRoute);
app.use("/api/shop/address", shopAddressRoute);
app.use("/api/shop/order", shopOrderRoute);
app.use("/api/shop/search", shopSearchRoute);
app.use("/api/shop/review", shopReviewRoute);

app.use("/api/common/feature", commonFeatureRoute);

// Global Error Middleware
app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
