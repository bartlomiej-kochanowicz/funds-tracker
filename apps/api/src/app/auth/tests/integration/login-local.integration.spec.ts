import gql from "graphql-tag";
import request from "supertest-graphql";
import { LoginLocal } from "@app/auth/entities";
import { IntegrationTestManager } from "@tests/IntegrationTestManager";
import { testUser } from "@tests/stubs/testUser.stub";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { loginUserStub } from "@src/app/auth/tests/stubs/login-local.stup";

describe("login local", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given the user exists", () => {
		describe("when a loginLocal mutation is executed", () => {
			let loginUser: LoginLocal;

			beforeAll(async () => {
				const response = await request<{ loginLocal: LoginLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation LoginLocal($data: LoginInput!) {
							loginLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: {
							email: testUser.email,
							password: testUser.password,
							token: testUser.token,
						},
					})
					.expectNoErrors();

				loginUser = response.data.loginLocal;
			});

			it("should return user entity", async () => {
				expect(loginUser).toMatchObject({
					success: true,
				});
			});
		});
	});

	describe("given the user exists but it is not confirmed", () => {
		describe("when a loginLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				// register new user to have new user in database for confirm action
				await integrationTestManager.getRegisterService().registerLocal(loginUserStub);

				const { response } = await request<{ loginLocal: LoginLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation LoginLocal($data: LoginInput!) {
							loginLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: {
							email: loginUserStub.email,
							password: loginUserStub.password,
							token: loginUserStub.token,
						},
					});

				resStatus = getGqlErrorStatus(response);
			});

			it("should return 403 status", async () => {
				expect(resStatus).toBe(403);
			});
		});
	});

	describe("given the user wrong password", () => {
		describe("when a loginLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ loginLocal: LoginLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation LoginLocal($data: LoginInput!) {
							loginLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: {
							email: testUser.email,
							password: "wrong password",
							token: testUser.token,
						},
					});

				resStatus = getGqlErrorStatus(response);
			});

			it("should return 403 status", async () => {
				expect(resStatus).toBe(403);
			});
		});
	});

	describe("given the user wrong email", () => {
		describe("when a loginLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ loginLocal: LoginLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation LoginLocal($data: LoginInput!) {
							loginLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: {
							email: "wrong_email@test.com",
							password: testUser.password,
							token: testUser.token,
						},
					});

				resStatus = getGqlErrorStatus(response);
			});

			it("should return 403 status", async () => {
				expect(resStatus).toBe(403);
			});
		});
	});
});
