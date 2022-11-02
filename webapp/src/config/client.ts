import axios from 'axios';
import { API_URL, IS_DEVELOPMENT } from 'config/env';

export const client = axios.create({
  baseURL: IS_DEVELOPMENT ? API_URL : '/api',
  timeout: 5000,
});
