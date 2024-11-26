import gql from "graphql-tag";
import request from "supertest-graphql";
import { SignInLocal } from "@app/auth/entities";
import { IntegrationTestManager } from "@src/tests/integration-test-manager";
import { testUser } from "@src/tests/stubs/test-user.stub";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { signInUserStub } from "@src/app/auth/tests/stubs/sign-in-local.stup";

describe("signIn local", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given the user exists", () => {
		describe("when a signInLocal mutation is executed", () => {
			let signInUser: SignInLocal;

			beforeAll(async () => {
				const response = await request<{ signInLocal: SignInLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignInLocal($data: SignInInput!) {
							signInLocal(data: $data) {
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

				signInUser = response.data.signInLocal;
			});

			it("should return user entity", async () => {
				expect(signInUser).toMatchObject({
					success: true,
				});
			});
		});
	});

	describe("given the user exists but it is not confirmed", () => {
		describe("when a signInLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				// sign up new user to have new user in database for confirm action
				await integrationTestManager.getSignUpService().signUpLocal(signInUserStub);

				const { response } = await request<{ signInLocal: SignInLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignInLocal($data: SignInInput!) {
							signInLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: {
							email: signInUserStub.email,
							password: signInUserStub.password,
							token: signInUserStub.token,
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
		describe("when a signInLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ signInLocal: SignInLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignInLocal($data: SignInInput!) {
							signInLocal(data: $data) {
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
		describe("when a signInLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ signInLocal: SignInLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation SignInLocal($data: SignInInput!) {
							signInLocal(data: $data) {
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
