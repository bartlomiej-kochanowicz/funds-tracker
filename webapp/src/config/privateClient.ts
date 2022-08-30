import axios from 'axios';
import { API_URL } from 'config/env';

export const clientPrivate = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});
