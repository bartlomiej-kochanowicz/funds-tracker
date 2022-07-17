import { rest } from 'msw';
import { API_URL_MOCK } from 'config/env';

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  uuid: string;
  email: string;
  username: string;
}

export default [
  rest.post<LoginBody, LoginResponse>(`${API_URL_MOCK}/auth/login`, (req, res, ctx) => {
    const { email } = req.body;

    return res(
      ctx.json({
        uuid: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        email,
        username: 'Test user',
      }),
    );
  }),
];
