import { DefaultApi, Configuration } from "@/api";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const BASE_PATH = import.meta.env.VITE_BASEPATH;
console.log(BASE_PATH)

const axiosInstance = axios.create({
  baseURL: BASE_PATH,
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = new DefaultApi(
    new Configuration({ basePath: BASE_PATH }),
    undefined,
    axiosInstance
);