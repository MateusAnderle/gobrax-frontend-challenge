import axios from "axios";

const baseURL = import.meta.env.VITE_HOST;

const api = axios.create({
  baseURL,
});

export default api;
