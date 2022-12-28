import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { User } from 'auth/entities';
import { IntegrationTestManager } from 'common/tests/IntegrationTestManager';
import { testUser } from 'common/tests/stubs/testUser.stub';
import { Response } from 'express';
import { signupUserStub, confirmUserStub } from 'auth/tests/stubs/confirmSignup.stub';

describe('confirm signup', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();

    const res = {} as Response;

    res.req = {} as any;

    res.req.headers = {
      'user-agent': 'user-to-confirm-session',
    };

    res.req.ip = '::ffff:127.0.0.1';

    res.cookie = (): any => {};

    // sign up new user to have new user in database for confirm action
    await integrationTestManager.getAuthService().signupLocal(signupUserStub);
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given the user exists', () => {
    describe('when a confirmSignup mutation is executed', () => {
      let confirmedUser: User;

      beforeAll(async () => {
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
});
