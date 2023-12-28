import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_localhost_url,
});
export const openapi = axios.create({
  baseURL: import.meta.env.VITE_Common_Local_url,
});
export const testApi = axios.create({
  baseURL: "http://localhost:3000/test",
});
