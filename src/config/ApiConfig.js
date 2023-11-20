import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_localhost_url,
});
export const openapi = axios.create({
  baseURL: `http://localhost:3000/common`,
});
