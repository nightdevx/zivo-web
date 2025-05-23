import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Request interceptor: Access token'ı tüm isteklere ekle, ancak /auth/ isteklerinde ekleme
API.interceptors.request.use(
  async (config) => {
    if (
      !config.url?.includes("/auth/") &&
      !(
        config.url?.includes("/companies") &&
        config.method?.toLowerCase() === "post"
      )
    ) {
      let accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Failed to refresh access token before request:");
        throw new Error("Failed to refresh access token before request:");
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;