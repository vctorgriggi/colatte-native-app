import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const index = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 45000,
  withCredentials: true,
});
