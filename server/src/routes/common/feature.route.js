import express from "express";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "../../controllers/admin/feature.controller.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", deleteFeatureImage);

export default router;
