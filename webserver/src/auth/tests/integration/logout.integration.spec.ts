import { Logout } from 'auth/entities';
import gql from 'graphql-tag';
import request from 'supertest-graphql';
import * as bcrypt from 'bcrypt';
import { getGqlErrorStatus } from 'common/tests/gqlStatus';
import { IntegrationTestManager } from 'common/tests/IntegrationTestManager';
import { testUser } from 'common/tests/stubs/testUser.stub';
import { logoutStub } from 'auth/tests/stubs/logout.stub';
import { Response } from 'express';

describe('logout', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('when logout mutation is executed and user is authenticated', () => {
    let logout: Logout;

    beforeAll(async () => {
      const response = await request<{ logout: Logout }>(integrationTestManager.httpServer)
        .set(
          'Cookie',
          `accessToken=${integrationTestManager.getAccessToken()}; refreshToken=${integrationTestManager.getRefreshToken()}`,
        )
        .set('user-agent', 'main-user-session')
        .mutate(
          gql`
            mutation Logout {
              logout {
                success
              }
            }
          `,
        )
        .expectNoErrors();

      logout = response.data.logout;
    });

    it('should return logout entity with truth value', async () => {
      expect(logout).toMatchObject({
        success: true,
      });
    });

    it('should remove refresh token from database', async () => {
      const refreshToken = await integrationTestManager.getRefreshToken();

      const user = await integrationTestManager.getPrismaService().user.findUnique({
        where: {
          email: testUser.email,
        },
        select: {
          sessions: true,
        },
      });

      const sessions = user.sessions.find(
        async ({ rtHash }) => await bcrypt.compare(refreshToken, rtHash),
      );

      expect(sessions).toBe(undefined);
    });
  });

  describe('when logout mutation is executed and user does not exist', () => {
    let logout: Logout;

    beforeAll(async () => {
      const res = {} as Response;

      res.req = {} as any;

      res.req.headers = {
        'user-agent': 'main-user-session',
      };

      res.req.ip = '::ffff:127.0.0.1';

      res.cookie = (): any => {};

      const { uuid } = await integrationTestManager.getAuthService().signupLocal(logoutStub, res);

      const { accessToken, refreshToken } = await integrationTestManager
        .getAuthService()
        .signinLocalForTests(uuid, '::ffff:127.0.0.1-logout-user-session');

      await integrationTestManager
        .getPrismaService()
        .session.deleteMany({ where: { userUuid: uuid } });

      await integrationTestManager
        .getPrismaService()
        .user.delete({ where: { email: logoutStub.email } });

      const response = await request<{ logout: Logout }>(integrationTestManager.httpServer)
        .set('Cookie', `accessToken=${accessToken}; refreshToken=${refreshToken}`)
        .set('user-agent', 'logout-user-session')
        .mutate(
          gql`
            mutation Logout {
              logout {
                success
              }
            }
          `,
        );

      logout = response.data.logout;
    });

    it('should return logout entity with falsy value', async () => {
      expect(logout).toMatchObject({
        success: false,
      });
    });
  });

  describe('when logout mutation is executed and user is not authenticated', () => {
    let resStatus: number;

    beforeAll(async () => {
      const { response } = await request<{ logout: Logout }>(
        integrationTestManager.httpServer,
      ).mutate(
        gql`
          mutation Logout {
            logout {
              success
            }
          }
        `,
      );

      resStatus = getGqlErrorStatus(response);
    });

    it('should return 401 status code', async () => {
      expect(resStatus).toBe(401);
    });
  });
});
