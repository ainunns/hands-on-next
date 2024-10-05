import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: false,
});

api.defaults.withCredentials = false;

api.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export default api;
