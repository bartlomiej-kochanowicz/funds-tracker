import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { Portfolio } from '@app/portfolios/entities';
import { IntegrationTestManager } from '@common/tests/IntegrationTestManager';
import { createPortfolioStub } from '../stubs/createPortfolio.stub';

describe('create portfolio', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('when createPortfolio mutation is executed', () => {
    let createdPortfolio: Portfolio;

    beforeAll(async () => {
      const response = await request<{ createPortfolio: Portfolio }>(
        integrationTestManager.httpServer,
      )
        .set('Cookie', `accessToken=${integrationTestManager.getAccessToken()}`)
        .mutate(
          gql`
            mutation CreatePortfolio($data: CreatePortfolioInput!) {
              createPortfolio(data: $data) {
                uuid
                name
              }
            }
          `,
        )
        .variables({
          data: createPortfolioStub,
        })
        .expectNoErrors();

      createdPortfolio = response.data.createPortfolio;
    });

    it('should return portfolio entity', async () => {
      expect(createdPortfolio).toMatchObject({
        name: createPortfolioStub.name,
      });
    });

    it('should create new user in database', async () => {
      const portfolio = await integrationTestManager.getPrismaService().portfolio.findUnique({
        where: {
          uuid: createdPortfolio.uuid,
        },
      });

      expect(portfolio).toBeDefined();
    });
  });
});
