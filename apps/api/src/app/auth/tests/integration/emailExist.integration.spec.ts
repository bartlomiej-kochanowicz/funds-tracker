import gql from "graphql-tag";
import request from "supertest-graphql";
import { Email } from "@app/auth/entities";
import { IntegrationTestManager } from "@tests/IntegrationTestManager";
import { testUser } from "@tests/stubs/testUser.stub";

describe("exist email", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("given the email exists", () => {
		describe("when a signinLocal mutation is executed", () => {
			let email: Email;

			beforeAll(async () => {
				const response = await request<{ emailExist: Email }>(integrationTestManager.httpServer)
					.mutate(gql`
						query EmailExist($data: EmailInput!) {
							emailExist(data: $data) {
								exist
							}
						}
					`)
					.variables({
						data: {
							email: testUser.email,
							token: testUser.token,
						},
					})
					.expectNoErrors();

				email = response.data.emailExist;
			});

			it("should return user entity", async () => {
				expect(email).toMatchObject({
					exist: true,
				});
			});
		});
	});
});
