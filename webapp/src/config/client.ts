import axios from 'axios';
import { API_URL } from 'config/env';

console.log({ API_URL });

export const client = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});
