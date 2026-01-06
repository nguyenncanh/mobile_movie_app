import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { storage } from "../utils/storage";

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const status = error.response?.status;

    if (status === 401) {
      await storage.removeToken();
    }

    return Promise.reject(error);
  }
);

export const get = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await axiosClient.get<T>(endpoint, config);
  return res.data;
};

export const post = async <T>(
  endpoint: string,
  body: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await axiosClient.post<T>(endpoint, body, config);
  return res.data;
};
