import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { getGqlErrorStatus } from 'common/tests/gqlStatus';
import { Refresh } from 'auth/entities';
import { IntegrationTestManager } from 'common/tests/IntegrationTestManager';
import { testUser } from 'common/tests/stubs/testUser.stub';

describe('refresh token', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('when refresh mutation is executed and user is authenticated', () => {
    let refreshToken: Refresh;

    beforeAll(async () => {
      const response = await request<{ refreshToken: Refresh }>(integrationTestManager.httpServer)
        .set('Cookie', `refreshToken=${integrationTestManager.getRefreshToken()}`)
        .mutate(
          gql`
            mutation RefreshToken {
              refreshToken {
                success
              }
            }
          `,
        )
        .expectNoErrors();

      refreshToken = response.data.refreshToken;
    });

    it('should return refreshToken entity with truth value', async () => {
      expect(refreshToken).toMatchObject({
        success: true,
      });
    });
  });

  describe('when refresh mutation is executed and user is not authenticated', () => {
    let resStatus: number;

    beforeAll(async () => {
      const { response } = await request<{ refreshToken: Refresh }>(
        integrationTestManager.httpServer,
      ).mutate(
        gql`
          mutation RefreshToken {
            refreshToken {
              success
            }
          }
        `,
      );

      resStatus = getGqlErrorStatus(response);
    });

    it('should return 401 status', async () => {
      expect(resStatus).toBe(401);
    });
  });
});
