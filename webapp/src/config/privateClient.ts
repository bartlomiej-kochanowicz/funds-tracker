import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'config/env';
import { refresh } from 'services/auth/refresh';
import { loadStore } from 'utils/localStorage';

const auth = loadStore('auth');

export const clientPrivate = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

clientPrivate.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

clientPrivate.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config;

    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const { data } = await refresh({ refreshToken: auth.refreshToken });

      const { accessToken } = data;

      prevRequest.headers.Authorization = `Bearer ${accessToken}`;

      return clientPrivate(prevRequest);
    }

    return Promise.reject(error);
  },
);
