import express from "express";
import cors from "cors";

import testimonialRoutes from "./router/testimonialRouter.js";
import adminRoutes from "./router/adminRouter.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form data

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", adminRoutes);

// Error handling for Multer (file upload errors)
app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
