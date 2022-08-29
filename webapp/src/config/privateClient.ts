import axios from 'axios';
import { API_URL } from 'config/env';
// import { refresh } from 'services/auth/refresh';

export const clientPrivate = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

/* clientPrivate.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config;

    // when accessToken is expired send request to gen new access token from refresh token and send failed request again
    if (error?.response?.status === 401 && !prevRequest?.sent && counter <= 3) {
      prevRequest.sent = true;

      await refresh();

      return clientPrivate(prevRequest);
    }

    return Promise.reject(error);
  },
);
 */
