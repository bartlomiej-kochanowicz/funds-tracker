import { Logout, User } from 'auth/entities';
import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { getGqlErrorStatus } from 'common/tests/gqlStatus';
import { IntegrationTestManager } from 'common/tests/IntegrationTestManager';
import { testUser } from 'common/tests/stubs/testUser.stub';

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
        .set('Cookie', `accessToken=${integrationTestManager.getAccessToken()}`)
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

    it('should return logout entity', async () => {
      expect(logout).toMatchObject({
        success: true,
      });
    });

    it('should remove refresh token from database', async () => {
      const user = await integrationTestManager.getPrismaService().user.findUnique({
        where: {
          email: testUser.email,
        },
        select: {
          rtHash: true,
        },
      });

      expect(user.rtHash).toBeNull();
    });
  });

  describe('when logout mutation is executed and user is not authenticated', () => {
    let resStatus: number;

    beforeAll(async () => {
      const { response } = await request<{ user: User }>(integrationTestManager.httpServer).mutate(
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
