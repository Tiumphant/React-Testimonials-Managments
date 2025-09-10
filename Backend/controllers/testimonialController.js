import Testimonial from "../models/Testimonial.js";

// CREATE - Submit new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { fullName, email, rating, title, feedback, consent } = req.body;

    // ✅ Handle uploaded files
    // If using upload.fields([{name: "profilePicture"}, {name: "media"}])
    const profilePicture = req.files?.profilePicture
      ? `/uploads/${req.files.profilePicture[0].filename}`
      : null;

    const mediaUrl = req.files?.media
      ? `/uploads/${req.files.media[0].filename}`
      : null;

    const testimonial = new Testimonial({
      fullName,
      email,
      rating,
      title,
      feedback,
      consent,
      profilePicture, // saved path for browser access
      mediaUrl, // saved path for browser access
    });

    await testimonial.save();

    res.status(201).json({
      message: "Testimonial submitted successfully",
      testimonial,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET - Approved testimonials (Public)
export const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "Approved" }).sort({
      createdAt: -1,
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - Testimonial by ID (Public)
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - All testimonials (Admin)
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Approve / Reject (Admin)
export const updateStatus = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    testimonial.status = req.body.status;
    await testimonial.save();

    res.json({ message: "Status updated", testimonial });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Remove testimonial (Admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
