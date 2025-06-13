import jwt from "jsonwebtoken";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { AppError } from "../helpers/appError.js";

export const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new AppError(401, "Unauthorized - No Token Provided");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) throw new AppError(401, "Unauthorized - Invalid Token");

  req.user = decoded;

  next();
});
