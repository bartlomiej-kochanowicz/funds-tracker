import gql from "graphql-tag";
import request from "supertest-graphql";
import { Portfolio } from "@app/portfolios/entities";
import { IntegrationTestManager } from "@common/tests/IntegrationTestManager";
import { portfolioCreateStub } from "../stubs/portfolioCreate.stub";

describe("create portfolio", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("when portfolioCreate mutation is executed", () => {
		let createdPortfolio: Portfolio;

		beforeAll(async () => {
			const response = await request<{ portfolioCreate: Portfolio }>(
				integrationTestManager.httpServer,
			)
				.set("Cookie", `accessToken=${integrationTestManager.getAccessToken()}`)
				.mutate(gql`
					mutation PortfolioCreate($data: PortfolioCreateInput!) {
						portfolioCreate(data: $data) {
							uuid
							name
						}
					}
				`)
				.variables({
					data: portfolioCreateStub,
				})
				.expectNoErrors();

			createdPortfolio = response.data.portfolioCreate;
		});

		it("should return portfolio entity", async () => {
			expect(createdPortfolio).toMatchObject({
				name: portfolioCreateStub.name,
			});
		});

		it("should create new user in database", async () => {
			const portfolio = await integrationTestManager.getPrismaService().portfolio.findUnique({
				where: {
					uuid: createdPortfolio.uuid,
				},
			});

			expect(portfolio).toBeDefined();
		});
	});
});
