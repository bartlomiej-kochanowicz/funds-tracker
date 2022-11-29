import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { User } from 'auth/entities';
import { IntegrationTestManager } from 'test/IntegrationTestManager';
import { signupUser } from '../stubs/signin.stub';

describe('signinLocal', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given does the user does not already signup', () => {
    describe('when a signinLocal mutation is executed', () => {
      let signupedUser: User;

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
            data: signupUser,
          })
          .expectNoErrors();

        signupedUser = response.data.signupLocal;
      });

      it('should return user entity', async () => {
        expect(signupedUser).toMatchObject({
          name: signupUser.name,
          email: signupUser.email,
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
});
