import gql from "graphql-tag";
import request from "supertest-graphql";
import { IntegrationTestManager } from "@tests/IntegrationTestManager";
import { testUser } from "@tests/stubs/testUser.stub";
import { registerUserStub, confirmUserStub } from "@src/app/auth/tests/stubs/register-confirm.stub";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { RegisterConfirm } from "@app/auth/entities";

describe("register confirm", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given the user exists", () => {
		describe("when a registerConfirm mutation is executed", () => {
			let confirmedUser: RegisterConfirm;

			beforeAll(async () => {
				// register new user to have new user in database for confirm action
				await integrationTestManager.getRegisterService().registerLocal(registerUserStub);

				const response = await request<{ registerConfirm: RegisterConfirm }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation RegisterConfirm($data: RegisterConfirmInput!) {
							registerConfirm(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: confirmUserStub,
					})
					.expectNoErrors();

				confirmedUser = response.data.registerConfirm;
			});

			it("should return user entity", async () => {
				expect(confirmedUser).toMatchObject({
					success: true,
				});
			});

			it("should update confirmationCodeHash fild in database", async () => {
				const user = await integrationTestManager.getPrismaService().user.findUnique({
					where: {
						email: registerUserStub.email,
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
		describe("when a registerConfirm mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ registerConfirm: RegisterConfirm }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation RegisterConfirm($data: RegisterConfirmInput!) {
							registerConfirm(data: $data) {
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
		describe("when a registerConfirm mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ registerConfirm: RegisterConfirm }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation RegisterConfirm($data: RegisterConfirmInput!) {
							registerConfirm(data: $data) {
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
						email: registerUserStub.email,
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
