import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTestimonialById } from "../api/testimonialApi";

const TestimonialDetail = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    const loadTestimonial = async () => {
      try {
        const res = await fetchTestimonialById(id);
        setTestimonial(res.data);
      } catch (err) {
        console.error("Failed to fetch testimonial:", err);
      }
    };

    loadTestimonial();
  }, [id]);

  if (!testimonial)
    return <p className="p-4 text-center text-gray-500">Loading...</p>;

  // Backend base URL for uploaded files
  const BASE_URL = "http://localhost:5000";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={
            testimonial.profilePicture
              ? `${BASE_URL}${testimonial.profilePicture}`
              : "https://via.placeholder.com/80"
          }
          alt="profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{testimonial.fullName}</h2>
          <p className="text-gray-600">{testimonial.designation}</p>
        </div>
      </div>

      {/* Testimonial Content */}
      <h3 className="text-lg font-semibold">{testimonial.title}</h3>
      <p className="mt-2 text-gray-700">{testimonial.feedback}</p>

      {/* Media (image or video) */}
      {testimonial.mediaUrl && (
        <div className="mt-4">
          {testimonial.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
            <img
              src={`${BASE_URL}${testimonial.mediaUrl}`}
              alt="testimonial media"
              className="rounded w-full max-h-96 object-cover"
            />
          ) : testimonial.mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={`${BASE_URL}${testimonial.mediaUrl}`}
              controls
              className="rounded w-full max-h-96"
            />
          ) : (
            <a
              href={`${BASE_URL}${testimonial.mediaUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Media
            </a>
          )}
        </div>
      )}

      {/* Rating */}
      <p className="text-yellow-500 mt-2">⭐ {testimonial.rating}</p>
    </div>
  );
};

export default TestimonialDetail;
