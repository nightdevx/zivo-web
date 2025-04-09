import axios from "axios";
import { useAccessKey } from "../stores/access-key.store";
import { useAuth } from "@/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = API.post(`/auth/refresh-token`)
      .then((response) => {
        const newAccessToken = response.data.accessToken;
        useAccessKey().setState(() => newAccessToken);
        return newAccessToken;
      })
      .catch((error) => {
        useAuth().logout();
        return null;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
  }
  return refreshPromise!;
};

//Request interceptor
API.interceptors.request.use(
  async (config) => {
    if (!config.url?.startsWith("/auth")) {
      const accessKeyStore = useAccessKey();
      let accessToken = accessKeyStore.state;

      if (!accessToken) {
        accessToken = await refreshAccessToken();
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // Request interceptor
// API.interceptors.request.use(
//   async (config) => {
//     const accessKeyStore = useAccessKey();
//     let accessToken = accessKeyStore.state;

//     if (!accessToken) {
//       accessToken = await refreshAccessToken();
//     }

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.error === "AccessExpired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }

    if (error.response?.data?.error === "RefreshExpired") {
      useAuth().logout();
    }

    return Promise.reject(error);
  }
);

export default API;
