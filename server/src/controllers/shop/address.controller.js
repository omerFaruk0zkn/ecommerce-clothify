import Address from "../../models/address.model.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { AppError } from "../../helpers/appError.js";

export const addAddress = asyncHandler(async (req, res) => {
  const { userId, address, city, pincode, phone, notes } = req.body;

  if (!userId || !address || !city || !pincode || !phone || !notes) {
    throw new AppError(400, "Invalid data provided");
  }

  const newlyCreatedAddress = new Address({
    userId,
    address,
    city,
    pincode,
    phone,
    notes,
  });

  await newlyCreatedAddress.save();

  res.status(201).json({
    success: true,
    data: newlyCreatedAddress,
  });
});

export const fetchAllAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new AppError(400, "User id is required");

  const addressList = await Address.find({ userId });

  res.status(200).json({
    success: true,
    data: addressList,
  });
});

export const editAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;
  const formData = req.body;

  if (!userId || !addressId)
    throw new AppError(400, "User and address id is required");

  const address = await Address.findOneAndUpdate(
    {
      _id: addressId,
      userId,
    },
    formData,
    { new: true }
  );

  if (!address) throw new AppError(404, "Address not found");

  res.status(200).json({
    success: true,
    data: address,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;

  if (!userId || !addressId)
    throw new AppError(400, "User and address id is required");

  const address = await Address.findOneAndDelete({ _id: addressId, userId });

  if (!address) throw new AppError(404, "Address not found");

  res.status(200).json({
    success: true,
    message: "Address deleted successfully",
  });
});
