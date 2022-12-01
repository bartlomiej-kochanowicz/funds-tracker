import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { Email } from 'auth/entities';
import { IntegrationTestManager } from 'test/IntegrationTestManager';
import { testUser } from 'test/stubs/testUser.stub';
import { getGqlErrorStatus } from 'test/gqlStatus';

describe('signin local', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given the email exists', () => {
    describe('when a signinLocal mutation is executed', () => {
      let email: Email;

      beforeAll(async () => {
        const response = await request<{ emailExist: Email }>(integrationTestManager.httpServer)
          .mutate(
            gql`
              query EmailExist($data: EmailInput!) {
                emailExist(data: $data) {
                  exist
                }
              }
            `,
          )
          .variables({
            data: {
              email: testUser.email,
              token: testUser.token,
            },
          })
          .expectNoErrors();

        email = response.data.emailExist;
      });

      it('should return user entity', async () => {
        expect(email).toMatchObject({
          exist: true,
        });
      });
    });
  });
});
