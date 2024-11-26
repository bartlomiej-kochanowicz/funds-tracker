import gql from "graphql-tag";
import request from "supertest-graphql";
import { IntegrationTestManager } from "@src/tests/integration-test-manager";
import { testUser } from "@src/tests/stubs/test-user.stub";
import { signUpUserStub, confirmUserStub } from "@src/app/auth/tests/stubs/confirm-sign-up.stub";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { ConfirmSignUp } from "@app/auth/entities";

describe("confirm signUp", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given the user exists", () => {
		describe("when a confirmSignUp mutation is executed", () => {
			let confirmedUser: ConfirmSignUp;

			beforeAll(async () => {
				// sign up new user to have new user in database for confirm action
				await integrationTestManager.getSignUpService().signUpLocal(signUpUserStub);

				const response = await request<{ confirmSignUp: ConfirmSignUp }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation ConfirmSignUp($data: ConfirmSignUpInput!) {
							confirmSignUp(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: confirmUserStub,
					})
					.expectNoErrors();

				confirmedUser = response.data.confirmSignUp;
			});

			it("should return user entity", async () => {
				expect(confirmedUser).toMatchObject({
					success: true,
				});
			});

			it("should update confirmationCodeHash fild in database", async () => {
				const user = await integrationTestManager.getPrismaService().user.findUnique({
					where: {
						email: signUpUserStub.email,
					},
					select: {
						confirmationCodeHash: true,
					},
				});

				expect(user.confirmationCodeHash).toBeNull();
			});
		});
	});

	describe("given the user exists and confirmed", () => {
		describe("when a confirmSignUp mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ confirmSignUp: ConfirmSignUp }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation ConfirmSignUp($data: ConfirmSignUpInput!) {
							confirmSignUp(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: {
							email: testUser.email,
							code: "123456",
							token: testUser.token,
						},
					});

				resStatus = getGqlErrorStatus(response);
			});

			it("should resolve with 403 status code", async () => {
				expect(resStatus).toBe(403);
			});
		});
	});

	describe("given the user not exists", () => {
		describe("when a confirmSignUp mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ confirmSignUp: ConfirmSignUp }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation ConfirmSignUp($data: ConfirmSignUpInput!) {
							confirmSignUp(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: {
							email: "notExisted@email.com",
							code: "123456",
							token: testUser.token,
						},
					});

				resStatus = getGqlErrorStatus(response);
			});

			it("should resolve with 403 status code", async () => {
				expect(resStatus).toBe(403);
			});

			it("should update confirmationCodeHash fild in database", async () => {
				const user = await integrationTestManager.getPrismaService().user.findUnique({
					where: {
						email: signUpUserStub.email,
					},
					select: {
						confirmationCodeHash: true,
					},
				});

				expect(user.confirmationCodeHash).toBeNull();
			});
		});
	});
});
