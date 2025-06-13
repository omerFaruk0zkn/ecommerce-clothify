import express from "express";
import upload from "../../middlewares/upload.middleware.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  handleImageDelete,
  handleImageUpload,
} from "../../controllers/admin/products.controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.delete("/delete-image", handleImageDelete);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

export default router;
