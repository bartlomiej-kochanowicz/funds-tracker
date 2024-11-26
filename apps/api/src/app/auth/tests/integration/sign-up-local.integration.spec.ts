import gql from "graphql-tag";
import request from "supertest-graphql";
import { SignUpLocal } from "@app/auth/entities";
import { IntegrationTestManager } from "@src/tests/integration-test-manager";
import { testUser } from "@src/tests/stubs/test-user.stub";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { signUpUserStub } from "../stubs/sign-up-local.stub";

describe("signUp local", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given does the user does not already signUp", () => {
		describe("when a signInLocal mutation is executed", () => {
			let signUp: SignUpLocal;

			beforeAll(async () => {
				const response = await request<{ signUpLocal: SignUpLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignUpLocal($data: SignUpInput!) {
							signUpLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: signUpUserStub,
					})
					.expectNoErrors();

				signUp = response.data.signUpLocal;
			});

			it("should return success", async () => {
				expect(signUp).toMatchObject({
					success: true,
				});
			});

			it("should create new user in database", async () => {
				const user = await integrationTestManager.getPrismaService().user.findUnique({
					where: {
						email: signUpUserStub.email,
					},
				});

				expect(user).toBeDefined();
			});
		});
	});

	describe("given does the user already signUp", () => {
		describe("when a signInLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ signUpLocal: SignUpLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignUpLocal($data: SignUpInput!) {
							signUpLocal(data: $data) {
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
