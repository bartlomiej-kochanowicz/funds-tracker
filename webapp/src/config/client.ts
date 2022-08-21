import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'config/env';
import { getLocalAuth } from 'helpers/userAuth';

const token = getLocalAuth()?.accessToken;

export const client = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

client.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
