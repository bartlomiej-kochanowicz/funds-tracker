import { User } from "@app/user/entities";
import gql from "graphql-tag";
import request from "supertest-graphql";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { IntegrationTestManager } from "@src/tests/integration-test-manager";
import { testUser } from "@src/tests/stubs/test-user.stub";

describe("user", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("when user query is executed and user is authenticated", () => {
		let user: User;

		beforeAll(async () => {
			const response = await request<{ user: User }>(integrationTestManager.httpServer)
				.set("Cookie", `accessToken=${integrationTestManager.getAccessToken()}`)
				.mutate(gql`
					query GetUser {
						user {
							name
							email
						}
					}
				`)
				.expectNoErrors();

			user = response.data.user;
		});

		it("should return user entity", async () => {
			expect(user).toMatchObject({
				name: testUser.name,
				email: testUser.email,
			});
		});
	});

	describe("when user query is executed and user is not authenticated", () => {
		let resStatus: number;

		beforeAll(async () => {
			const { response } = await request<{ user: User }>(integrationTestManager.httpServer).mutate(
				gql`
					query GetUser {
						user {
							name
							email
						}
					}
				`,
			);

			resStatus = getGqlErrorStatus(response);
		});

		it("should return 401 status code", async () => {
			expect(resStatus).toBe(401);
		});
	});
});
