import axios from "axios";

const baseURL = "https://contact-book-vh02.onrender.com/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

export default api;
