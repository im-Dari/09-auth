import axios from 'axios';

const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${apiBase}/api`,
  withCredentials: true,
});