import axios, { AxiosInstance } from "axios";

export const chatAppAPI: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CHATAPP_API,
  withCredentials: true,
});
