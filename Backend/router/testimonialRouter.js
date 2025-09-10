import express from "express";
import {
  createTestimonial,
  getApprovedTestimonials,
  getTestimonialById,
  getAllTestimonials,
  updateStatus,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
import { protectAdmin } from "../middleware/Auth.Middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Public Routes
// Use upload.fields to handle multiple files: profilePicture + media
router.post(
  "/create",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "media", maxCount: 1 },
  ]),
  createTestimonial
);

router.get("/approved", getApprovedTestimonials);
router.get("/:id", getTestimonialById);

// Admin Routes (Protected)
router.get("/all/list", protectAdmin, getAllTestimonials);
router.put("/:id/status", protectAdmin, updateStatus);
router.delete("/:id", protectAdmin, deleteTestimonial);

export default router;
