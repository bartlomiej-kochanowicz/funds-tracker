import gql from "graphql-tag";
import request from "supertest-graphql";
import { RegisterLocal } from "@app/auth/entities";
import { IntegrationTestManager } from "@tests/IntegrationTestManager";
import { testUser } from "@tests/stubs/testUser.stub";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { registerUserStub } from "../stubs/register.stub";

describe("register local", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given does the user does not already register", () => {
		describe("when a loginLocal mutation is executed", () => {
			let register: RegisterLocal;

			beforeAll(async () => {
				const response = await request<{ registerLocal: RegisterLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation RegisterLocal($data: RegisterInput!) {
							registerLocal(data: $data) {
								success
							}
						}
					`)
					.variables({
						data: registerUserStub,
					})
					.expectNoErrors();

				register = response.data.registerLocal;
			});

			it("should return success", async () => {
				expect(register).toMatchObject({
					success: true,
				});
			});

			it("should create new user in database", async () => {
				const user = await integrationTestManager.getPrismaService().user.findUnique({
					where: {
						email: registerUserStub.email,
					},
				});

				expect(user).toBeDefined();
			});
		});
	});

	describe("given does the user already register", () => {
		describe("when a loginLocal mutation is executed", () => {
			let resStatus: number;

			beforeAll(async () => {
				const { response } = await request<{ registerLocal: RegisterLocal }>(
					integrationTestManager.httpServer,
				)
					.mutate(gql`
						mutation RegisterLocal($data: RegisterInput!) {
							registerLocal(data: $data) {
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
