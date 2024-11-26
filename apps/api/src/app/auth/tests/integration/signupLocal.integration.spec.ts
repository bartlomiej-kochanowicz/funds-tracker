import gql from "graphql-tag";
import request from "supertest-graphql";
import { SignupLocal } from "@app/auth/entities";
import { IntegrationTestManager } from "@tests/IntegrationTestManager";
import { testUser } from "@tests/stubs/testUser.stub";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { signupUserStub } from "../stubs/signup.stub";

describe("signup local", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given does the user does not already signup", () => {
		describe("when a signinLocal mutation is executed", () => {
			let signup: SignupLocal;

			beforeAll(async () => {
				const response = await request<{ signupLocal: SignupLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignupLocal($data: SignupInput!) {
							signupLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: signupUserStub,
					})
					.expectNoErrors();

				signup = response.data.signupLocal;
			});

			it("should return success", async () => {
				expect(signup).toMatchObject({
					success: true,
				});
			});

			it("should create new user in database", async () => {
				const user = await integrationTestManager.getPrismaService().user.findUnique({
					where: {
						email: signupUserStub.email,
					},
				});

				expect(user).toBeDefined();
			});
		});
	});

	describe("given does the user already signup", () => {
		describe("when a signinLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ signupLocal: SignupLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignupLocal($data: SignupInput!) {
							signupLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: testUser,
					});

				resStatus = getGqlErrorStatus(response);
			});

			it("should return 403 status", async () => {
				expect(resStatus).toBe(403);
			});
		});
	});
});
