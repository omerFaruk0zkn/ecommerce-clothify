import User from "../../models/user.model.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";
import { generateToken } from "../../helpers/generateToken.js";

// register
export const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new AppError(400, "All fields are required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (user) throw new AppError(400, "Username or Email already exists");

  const newUser = new User({
    userName,
    email,
    password,
  });

  await newUser.save();

  res.status(201).json({
    success: true,
    message: "Registration successfully",
  });
});

// login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) throw new AppError(404, "Invalid credentials! Please try again");

  const checkPasswordMatch = await user.comparePassword(password);

  if (!checkPasswordMatch)
    throw new AppError(400, "Invalid credentials! Please try again");

  generateToken(user, res);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user,
  });
});

// logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
});

// check-auth
export const checkAuthUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user) throw new AppError(404, "User not found");

  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user,
  });
});
