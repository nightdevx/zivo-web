import axios from "axios";
import { useAccessKey } from "../stores/access-key.store";
import { useAuth } from "@/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Refresh token işlevi
async function refreshAccessToken() {
  try {
    const response = await API.post(`/auth/refresh-token`);
    const newAccessToken = response.data.accessToken;

    // Access token'ı store'da güncelle
    const accessKeyStore = useAccessKey();
    accessKeyStore.setState(() => newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
}

// Request interceptor: Access token'ı tüm isteklere ekle, ancak /auth/ isteklerinde ekleme
API.interceptors.request.use(
  async (config) => {
    if (!config.url?.includes("/auth/")) {
      const accessKeyStore = useAccessKey();
      let accessToken = accessKeyStore.state;

      if (!accessToken) {
        try {
          accessToken = await refreshAccessToken();
        } catch (error) {
          console.error(
            "Failed to refresh access token before request:",
            error
          );
          throw error;
        }
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: 401 hatalarını yakala ve refresh token kullan
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        // Yeni access token ile isteği tekrar gönder
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);

        // Kullanıcıyı çıkış yap
        const auth = useAuth();
        auth.logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
