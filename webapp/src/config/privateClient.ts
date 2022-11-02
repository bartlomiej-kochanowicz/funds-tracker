import axios from 'axios';
import { API_URL, IS_DEVELOPMENT } from 'config/env';

export const clientPrivate = axios.create({
  baseURL: IS_DEVELOPMENT ? API_URL : '/api',
  timeout: 5000,
  withCredentials: true,
});
