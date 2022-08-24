import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'config/env';
import { refresh } from 'services/auth/refresh';

export const clientPrivate = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

clientPrivate.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config;

    console.log('AUTH ERROR', error?.response?.status === 401 && !prevRequest?.sent);

    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;

      /* const { accessToken } = data;

      prevRequest.headers.Authorization = `Bearer ${accessToken}`;

      return clientPrivate(prevRequest); */
    }

    return Promise.reject(error);
  },
);
