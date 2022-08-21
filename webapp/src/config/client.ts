import axios from 'axios';
import { API_URL } from 'config/env';
import { getLocalAuth } from 'helpers/userAuth';

const token = getLocalAuth()?.accessToken;

export const client = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { Authorization: `Bearer ${token}` },
});
