import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { User } from 'auth/entities';
import { IntegrationTestManager } from 'test/IntegrationTestManager';
import { testUser } from 'test/stubs/testUser.stub';
import { getGqlErrorStatus } from 'test/gqlStatus';
import { signupUserStub } from '../stubs/signup.stub';

describe('signup local', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given does the user does not already signup', () => {
    describe('when a signinLocal mutation is executed', () => {
      let signupUser: User;

      beforeAll(async () => {
        const response = await request<{ signupLocal: User }>(integrationTestManager.httpServer)
          .mutate(
            gql`
              mutation SignupLocal($data: SignupInput!) {
                signupLocal(data: $data) {
                  name
                  email
                }
              }
            `,
          )
          .variables({
            data: signupUserStub,
          })
          .expectNoErrors();

        signupUser = response.data.signupLocal;
      });

      it('should return user entity', async () => {
        expect(signupUser).toMatchObject({
          name: signupUserStub.name,
          email: signupUserStub.email,
        });
      });

      it('should create new user in database', async () => {
        const user = await integrationTestManager.getPrismaService().user.findUnique({
          where: {
            email: signupUser.email,
          },
        });

        expect(user).toBeDefined();
      });
    });
  });

  describe('given does the user already signup', () => {
    describe('when a signinLocal mutation is executed', () => {
      let resStatus: number;

      beforeAll(async () => {
        const { response } = await request<{ signupLocal: User }>(integrationTestManager.httpServer)
          .mutate(
            gql`
              mutation SignupLocal($data: SignupInput!) {
                signupLocal(data: $data) {
                  name
                  email
                }
              }
            `,
          )
          .variables({
            data: testUser,
          });

        resStatus = getGqlErrorStatus(response);
      });

      it('should return 403 status', async () => {
        expect(resStatus).toBe(403);
      });
    });
  });
});