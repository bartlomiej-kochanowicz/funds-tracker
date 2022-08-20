import { saveStore, loadStore } from 'utils/localStorage';

export const setAccessToken = (accessToken: string) => saveStore(accessToken, 'accessToken');
export const getAccessToken = () => loadStore('accessToken');

export const setRefreshToken = (refreshToken: string) => saveStore(refreshToken, 'refreshToken');
export const getRefreshToken = () => loadStore('refreshToken');
