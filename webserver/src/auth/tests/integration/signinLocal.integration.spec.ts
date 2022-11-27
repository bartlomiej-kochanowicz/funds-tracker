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
                  uuid
                  name
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

      test('then the user is signuped', async () => {
        console.log('end');
      });
    });
  });
});
