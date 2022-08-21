import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export interface RefreshProps {
  refreshToken: string;
}

export interface RefreshResponse {
  uuid: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export const refresh = retryHTTP(({ refreshToken }: RefreshProps) =>
  client.post<RefreshResponse>('/auth/refresh', null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  }),
);
