import { Logout } from "@app/auth/entities";
import gql from "graphql-tag";
import request from "supertest-graphql";
import * as bcrypt from "bcrypt";
import { getGqlErrorStatus } from "@tests/gqlStatus";
import { IntegrationTestManager } from "@src/tests/integration-test-manager";
import { logoutStub1, logoutStub2 } from "@app/auth/tests/stubs/logout.stub";
import { Response } from "express";

describe("logout", () => {
	const integrationTestManager = new IntegrationTestManager();

	beforeAll(async () => {
		await integrationTestManager.beforeAll();
	});

	afterAll(async () => {
		await integrationTestManager.afterAll();
	});

	describe("when logout mutation is executed and user is authenticated", () => {
		let logout: Logout;

		beforeAll(async () => {
			const res = {
				req: {
					ip: "::ffff:127.0.0.1",
					headers: {
						"user-agent": "user-to-logout-session",
					},
				},
			} as Response;

			res.cookie = (): any => {};

			// sign up new user to have new user in database for logout
			await integrationTestManager.getSignUpService().signUpLocal(logoutStub1);

			// confirm user
			await integrationTestManager
				.getSignUpService()
				.confirmSignUp({ email: logoutStub1.email, token: logoutStub1.token, code: "123456" }, res);

			const { accessToken, refreshToken } = await integrationTestManager
				.getSignInService()
				.signInLocalForTests(logoutStub1.email, "::ffff:127.0.0.1-user-to-logout-session");

			const response = await request<{ logout: Logout }>(integrationTestManager.httpServer)
				.set("Cookie", `accessToken=${accessToken}; refreshToken=${refreshToken}`)
				.set("user-agent", "main-user-session")
				.mutate(gql`
					mutation Logout {
						logout {
							success
						}
					}
				`)
				.expectNoErrors();

			logout = response.data.logout;
		});

		it("should return logout entity with truth value", async () => {
			expect(logout).toMatchObject({
				success: true,
			});
		});

		it("should remove refresh token from database", async () => {
			const refreshToken = await integrationTestManager.getRefreshToken();

			const user = await integrationTestManager.getPrismaService().user.findUnique({
				where: {
					email: logoutStub1.email,
				},
				select: {
					sessions: true,
				},
			});

			const sessions = user.sessions.find(
				async ({ rtHash }) => await bcrypt.compare(refreshToken, rtHash),
			);

			expect(sessions).toBe(undefined);
		});
	});

	describe("when logout mutation is executed and user does not exist", () => {
		let logout: Logout;

		beforeAll(async () => {
			const res = {
				req: {
					ip: "::ffff:127.0.0.1",
					headers: {
						"user-agent": "main-user-session",
					},
				},
			} as Response;

			res.cookie = (): any => {};

			// sign up new user to have user in database
			await integrationTestManager.getSignUpService().signUpLocal(logoutStub2);

			// confirm user
			await integrationTestManager
				.getSignUpService()
				.confirmSignUp({ email: logoutStub2.email, token: logoutStub2.token, code: "123456" }, res);

			const { accessToken, refreshToken } = await integrationTestManager
				.getSignInService()
				.signInLocalForTests(logoutStub2.email, "::ffff:127.0.0.1-logout-user-session");

			const { uuid } = await integrationTestManager
				.getPrismaService()
				.user.findUnique({ where: { email: logoutStub2.email } });

			await integrationTestManager
				.getPrismaService()
				.session.deleteMany({ where: { userUuid: uuid } });

			await integrationTestManager
				.getPrismaService()
				.user.delete({ where: { email: logoutStub2.email } });

			const response = await request<{ logout: Logout }>(integrationTestManager.httpServer)
				.set("Cookie", `accessToken=${accessToken}; refreshToken=${refreshToken}`)
				.set("user-agent", "logout-user-session")
				.mutate(gql`
					mutation Logout {
						logout {
							success
						}
					}
				`);

			logout = response.data.logout;
		});

		it("should return logout entity with falsy value", async () => {
			expect(logout).toMatchObject({
				success: false,
			});
		});
	});

	describe("when logout mutation is executed and user is not authenticated", () => {
		let resStatus: number;

		beforeAll(async () => {
			const { response } = await request<{ logout: Logout }>(
				integrationTestManager.httpServer,
			).mutate(gql`
				mutation Logout {
					logout {
						success
					}
				}
			`);

			resStatus = getGqlErrorStatus(response);
		});

		it("should resolve with 401 status code", async () => {
			expect(resStatus).toBe(401);
		});
	});
});
