import { useState } from "react";
import React from "react";
import { submitTestimonial } from "../api/testimonialApi";

const steps = ["User Info", "Rating", "Content", "Consent"];

export default function SubmitTestimonial() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    designation: "",
    companyName: "",
    rating: 0,
    title: "",
    feedback: "",
    consent: false,
  });

  const [profileFile, setProfileFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const next = () => step < steps.length - 1 && setStep(step + 1);
  const back = () => step > 0 && setStep(step - 1);

  const handleSubmit = async () => {
    if (!form.consent) {
      alert("Please give consent to submit your testimonial.");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      if (profileFile) formData.append("profilePicture", profileFile);
      if (mediaFile) formData.append("media", mediaFile);

      const response = await submitTestimonial(formData);
      alert("Testimonial submitted successfully!");
  console.log(response.data)
      // Reset form
      setForm({
        fullName: "",
        email: "",
        designation: "",
        companyName: "",
        rating: 0,
        title: "",
        feedback: "",
        consent: false,
      });
      setProfileFile(null);
      setMediaFile(null);
      setStep(0);
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Submit Testimonial</h2>
      <p className="mb-4">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      {/* Step 1 - User Info */}
      {step === 0 && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name *"
            className="border p-2 w-full"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email *"
            className="border p-2 w-full"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            className="border p-2 w-full"
            value={form.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />
          <input
            type="text"
            placeholder="Company Name"
            className="border p-2 w-full"
            value={form.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />
          {/* Profile picture upload */}
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full"
            onChange={(e) => setProfileFile(e.target.files[0])}
          />
          {profileFile && (
            <p className="text-sm text-gray-600">
              Selected profile picture: {profileFile.name}
            </p>
          )}
        </div>
      )}

      {/* Step 2 - Rating */}
      {step === 1 && (
        <div className="space-y-3">
          <label className="block font-medium">Rating:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleChange("rating", star)}
                className={`cursor-pointer text-3xl ${
                  form.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Selected: {form.rating} star{form.rating > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Step 3 - Testimonial Content */}
      {step === 2 && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title *"
            className="border p-2 w-full"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <textarea
            placeholder="Detailed Feedback *"
            className="border p-2 w-full"
            rows={4}
            value={form.feedback}
            onChange={(e) => handleChange("feedback", e.target.value)}
          />
          {/* Media file upload */}
          <input
            type="file"
            accept="image/*,video/*"
            className="border p-2 w-full"
            onChange={(e) => setMediaFile(e.target.files[0])}
          />
          {mediaFile && (
            <p className="text-sm text-gray-600">
              Selected media: {mediaFile.name}
            </p>
          )}
        </div>
      )}

      {/* Step 4 - Consent */}
      {step === 3 && (
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => handleChange("consent", e.target.checked)}
            />
            <span>I consent to my testimonial being published.</span>
          </label>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button onClick={back} className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
