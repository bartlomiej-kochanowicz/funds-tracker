import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { SendCode } from 'auth/entities/sendCode.entity';
import { IntegrationTestManager } from 'common/tests/IntegrationTestManager';
import { sendCodeStub } from 'auth/tests/stubs/sendCode.stup';
import { Response } from 'express';
import { getGqlErrorStatus } from 'common/tests/gqlStatus';
import { testUser } from 'common/tests/stubs/testUser.stub';

describe('send code', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('when sendCode mutation is executed and user is not confirmed', () => {
    let sendCode: SendCode;
    let prevCodeHash: string;

    beforeAll(async () => {
      const res = {} as Response;

      res.req = {} as any;

      res.req.headers = {
        'user-agent': 'sendCode-user-session',
      };

      res.req.ip = '::ffff:127.0.0.1';

      res.cookie = (): any => {};

      // sign up new user to have user in database
      await integrationTestManager.getAuthService().signupLocal(sendCodeStub);

      prevCodeHash = (
        await integrationTestManager
          .getPrismaService()
          .user.findUnique({ where: { email: sendCodeStub.email } })
      ).confirmationCodeHash;

      const response = await request<{ sendCode: SendCode }>(integrationTestManager.httpServer)
        .mutate(
          gql`
            mutation SendCode($data: SendCodeInput!) {
              sendCode(data: $data) {
                success
              }
            }
          `,
        )
        .variables({
          data: {
            email: sendCodeStub.email,
            token: sendCodeStub.token,
          },
        })
        .expectNoErrors();

      sendCode = response.data.sendCode;
    });

    it('should return sendCode entity with truth value', async () => {
      expect(sendCode).toMatchObject({
        success: true,
      });
    });

    it('should old and new code hash be diffent', async () => {
      const newCodeHash = (
        await integrationTestManager
          .getPrismaService()
          .user.findUnique({ where: { email: sendCodeStub.email } })
      ).confirmationCodeHash;

      expect(prevCodeHash).not.toBe(newCodeHash);
    });
  });

  describe('when sendCode mutation is executed and user does not exist', () => {
    let resStatus: number;

    beforeAll(async () => {
      const { response } = await request<{ sendCode: SendCode }>(integrationTestManager.httpServer)
        .mutate(
          gql`
            mutation SendCode($data: SendCodeInput!) {
              sendCode(data: $data) {
                success
              }
            }
          `,
        )
        .variables({
          data: {
            email: 'not-existing-user@email.com',
            token: 'mock-token',
          },
        });

      resStatus = getGqlErrorStatus(response);
    });

    it('should return 403 status', async () => {
      expect(resStatus).toBe(403);
    });
  });

  describe('when sendCode mutation is executed and user is already confirmed', () => {
    let resStatus: number;

    beforeAll(async () => {
      const { response } = await request<{ sendCode: SendCode }>(integrationTestManager.httpServer)
        .mutate(
          gql`
            mutation SendCode($data: SendCodeInput!) {
              sendCode(data: $data) {
                success
              }
            }
          `,
        )
        .variables({
          data: {
            email: testUser.email,
            token: testUser.token,
          },
        });

      resStatus = getGqlErrorStatus(response);
    });

    it('should return 403 status', async () => {
      expect(resStatus).toBe(403);
    });
  });
});
