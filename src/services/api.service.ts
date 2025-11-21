import { getItem } from "@/components/helper/localstorage.helper";
import axios from "axios";

// Base URL API
const api = axios.create({
  baseURL: "/api",
  headers: {
    "apikey": process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  },
});

// Tambahkan Interceptor untuk Request
api.interceptors.request.use(
  (config) => {
    const token = getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Prefer = "return=minimal";
    }
    
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Tambahkan Interceptor untuk Response
api.interceptors.response.use(
  (response) => response, // Jika response sukses, langsung dikembalikan
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
