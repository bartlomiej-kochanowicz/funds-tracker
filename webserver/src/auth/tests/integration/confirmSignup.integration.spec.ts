import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { User } from 'auth/entities';
import { IntegrationTestManager } from 'common/tests/IntegrationTestManager';
import { testUser } from 'common/tests/stubs/testUser.stub';
import { signupUserStub, confirmUserStub } from 'auth/tests/stubs/confirmSignup.stub';
import { getGqlErrorStatus } from 'common/tests/gqlStatus';

describe('confirm signup', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given the user exists', () => {
    describe('when a confirmSignup mutation is executed', () => {
      let confirmedUser: User;

      beforeAll(async () => {
        // sign up new user to have new user in database for confirm action
        await integrationTestManager.getAuthService().signupLocal(signupUserStub);

        const response = await request<{ confirmSignup: User }>(integrationTestManager.httpServer)
          .mutate(
            gql`
              mutation ConfirmSignup($data: ConfirmSignupInput!) {
                confirmSignup(data: $data) {
                  email
                }
              }
            `,
          )
          .variables({
            data: confirmUserStub,
          })
          .expectNoErrors();

        confirmedUser = response.data.confirmSignup;
      });

      it('should return user entity', async () => {
        expect(confirmedUser).toMatchObject({
          email: signupUserStub.email,
        });
      });

      it('should update confirmationCodeHash fild in database', async () => {
        const user = await integrationTestManager.getPrismaService().user.findUnique({
          where: {
            email: signupUserStub.email,
          },
          select: {
            confirmationCodeHash: true,
          },
        });

        expect(user.confirmationCodeHash).toBeNull();
      });
    });
  });

  describe('given the user exists and confirmed', () => {
    describe('when a confirmSignup mutation is executed', () => {
      let resStatus: number;

      beforeAll(async () => {
        const { response } = await request<{ confirmSignup: User }>(
          integrationTestManager.httpServer,
        )
          .mutate(
            gql`
              mutation ConfirmSignup($data: ConfirmSignupInput!) {
                confirmSignup(data: $data) {
                  email
                }
              }
            `,
          )
          .variables({
            data: {
              email: testUser.email,
              code: '123456',
              token: testUser.token,
            },
          });

        resStatus = getGqlErrorStatus(response);
      });

      it('should resolve with 403 status code', async () => {
        expect(resStatus).toBe(403);
      });
    });
  });

  describe('given the user not exists', () => {
    describe('when a confirmSignup mutation is executed', () => {
      let resStatus: number;

      beforeAll(async () => {
        const { response } = await request<{ confirmSignup: User }>(
          integrationTestManager.httpServer,
        )
          .mutate(
            gql`
              mutation ConfirmSignup($data: ConfirmSignupInput!) {
                confirmSignup(data: $data) {
                  email
                }
              }
            `,
          )
          .variables({
            data: {
              email: 'notExisted@email.com',
              code: '123456',
              token: testUser.token,
            },
          });

        resStatus = getGqlErrorStatus(response);
      });

      it('should resolve with 403 status code', async () => {
        expect(resStatus).toBe(403);
      });

      it('should update confirmationCodeHash fild in database', async () => {
        const user = await integrationTestManager.getPrismaService().user.findUnique({
          where: {
            email: signupUserStub.email,
          },
          select: {
            confirmationCodeHash: true,
          },
        });

        expect(user.confirmationCodeHash).toBeNull();
      });
    });
  });
});
