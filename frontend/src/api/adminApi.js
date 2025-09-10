import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/testimonials" });

// 🔑 Admin Login
export const adminLogin = async (credentials) => {
  const res = await axios.post(
    "http://localhost:5000/api/admin/login",
    credentials
  );
  return res.data; // returns { token, ... }
};

// 📌 Fetch all testimonials
export const adminFetchAll = async () => {
  const token = localStorage.getItem("adminToken");
  const res = await API.get("/all/list", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📌 Update status
export const adminUpdateStatus = async (id, status) => {
  const token = localStorage.getItem("adminToken");
  const res = await API.put(
    `/${id}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// 📌 Delete testimonial
export const adminDeleteTestimonial = async (id) => {
  const token = localStorage.getItem("adminToken");
  const res = await API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
