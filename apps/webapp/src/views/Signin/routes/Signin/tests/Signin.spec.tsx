import { GraphQLError } from "graphql";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";
import { SIGNIN } from "graphql/mutations/authentication/Signin";
import { EMAIL_EXIST } from "graphql/query/common/EmailExist";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { useEffect } from "react";
import { ROUTES } from "routes/paths";
import { waitFor } from "utils/test-utils";

import { Signin } from "../Signin";
import { SigninPO } from "./Signin.po";

vi.mock("react-google-recaptcha-v3", () => ({
	GoogleReCaptcha: ({
		onVerify,
		refreshReCaptcha,
	}: {
		onVerify: (token: string) => string;
		refreshReCaptcha: boolean;
	}) => {
		useEffect(() => {
			onVerify("token");
		}, [onVerify, refreshReCaptcha]);

		return null;
	},
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
	...((await vi.importActual("react-router-dom")) as typeof import("react-router-dom")),
	useNavigate: () => mockNavigate,
}));

vi.mock("helpers/showToast", () => ({ showErrorToast: vi.fn(), showSuccessToast: vi.fn() }));

describe("Signin tests", () => {
	afterAll(vi.clearAllMocks);

	it("sign in properly", async () => {
		// given
		const mocks = [
			{
				request: {
					query: EMAIL_EXIST,
					variables: {
						data: {
							email: "test@email.xyz",
							token: "token",
						},
					},
				},
				result: {
					data: {
						emailExist: {
							exist: true,
						},
					},
				},
			},
			{
				request: {
					query: SIGNIN,
					variables: {
						data: {
							email: "test@email.xyz",
							password: "TestPassword1122",
							token: "token",
						},
					},
				},
				result: {
					data: {
						signinLocal: {
							success: true,
						},
					},
				},
			},
		];

		const signinPO = SigninPO.render(Signin, mocks);

		// when
		await signinPO.setEmail("test@email.xyz");

		// then
		signinPO.expectButtonHasProperText("Next");
		// when
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		signinPO.expectButtonHasProperText("Sign in");

		// when
		await signinPO.setPassword("TestPassword1122");
		await signinPO.submitForm();

		// then
		await waitFor(() =>
			signinPO.expectSuccessCallback(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD),
		);
	});

	it("shows error when email is invalid", async () => {
		// given
		const signinPO = SigninPO.render(Signin);

		// when
		await signinPO.setEmail("test");
		await signinPO.submitForm();

		// then
		await signinPO.expectTextDisplayed("Invalid email address!");
	});

	it("shows error when email does not exist", async () => {
		// given
		const mocks = [
			{
				request: {
					query: EMAIL_EXIST,
					variables: {
						data: {
							email: "test@email.xyz",
							token: "token",
						},
					},
				},
				result: {
					data: {
						emailExist: {
							exist: false,
						},
					},
				},
			},
		];

		const signinPO = SigninPO.render(Signin, mocks);

		// when
		await signinPO.setEmail("test@email.xyz");
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		await signinPO.expectTextDisplayed("Account does not exist");
	});

	it("shows error when password is wrond", async () => {
		// given
		const mocks = [
			{
				request: {
					query: EMAIL_EXIST,
					variables: {
						data: {
							email: "test@email.xyz",
							token: "token",
						},
					},
				},
				result: {
					data: {
						emailExist: {
							exist: true,
						},
					},
				},
			},
			{
				request: {
					query: SIGNIN,
					variables: {
						data: {
							email: "test@email.xyz",
							password: "TestPassword1122",
							token: "token",
						},
					},
				},
				result: {
					errors: [new GraphQLError("Wrong password")],
				},
			},
		];

		const signinPO = SigninPO.render(Signin, mocks);

		// when
		await signinPO.setEmail("test@email.xyz");

		// then
		signinPO.expectButtonHasProperText("Next");

		// when
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		signinPO.expectButtonHasProperText("Sign in");

		// when
		await signinPO.setPassword("TestPassword1122");
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		await signinPO.expectTextDisplayed("Wrong password");
	});

	it("send code and redirect when email is not confirmed", async () => {
		// given
		const mocks = [
			{
				request: {
					query: EMAIL_EXIST,
					variables: {
						data: {
							email: "test@email.xyz",
							token: "token",
						},
					},
				},
				result: {
					data: {
						emailExist: {
							exist: true,
						},
					},
				},
			},
			{
				request: {
					query: SIGNIN,
					variables: {
						data: {
							email: "test@email.xyz",
							password: "TestPassword1122",
							token: "token",
						},
					},
				},
				result: {
					errors: [new GraphQLError("User not confirmed.")],
				},
			},
			{
				request: {
					query: SEND_CODE,
					variables: {
						data: {
							email: "test@email.xyz",
							token: "token",
						},
					},
				},
				result: {
					data: {
						sendCode: {
							success: true,
						},
					},
				},
			},
		];

		const signinPO = SigninPO.render(Signin, mocks);

		// when
		await signinPO.setEmail("test@email.xyz");

		// then
		signinPO.expectButtonHasProperText("Next");

		// when
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		signinPO.expectButtonHasProperText("Sign in");

		// when
		await signinPO.setPassword("TestPassword1122");
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		await signinPO.expectTextDisplayed("User not confirmed.");
		await waitFor(() =>
			signinPO
				.expectSuccessCallback(mockNavigate)
				.toHaveBeenCalledWith(ROUTES.SIGNUP.CONFIRM, { state: { email: "test@email.xyz" } }),
		);

		await waitFor(() =>
			expect(showSuccessToast).toHaveBeenCalledWith(
				"Confirmation code has been sent to your email.",
			),
		);
	});

	it("send code and redirect when email is not confirmed - sending failure", async () => {
		// given
		const mocks = [
			{
				request: {
					query: EMAIL_EXIST,
					variables: {
						data: {
							email: "test@email.xyz",
							token: "token",
						},
					},
				},
				result: {
					data: {
						emailExist: {
							exist: true,
						},
					},
				},
			},
			{
				request: {
					query: SIGNIN,
					variables: {
						data: {
							email: "test@email.xyz",
							password: "TestPassword1122",
							token: "token",
						},
					},
				},
				result: {
					errors: [new GraphQLError("User not confirmed.")],
				},
			},
			{
				request: {
					query: SEND_CODE,
					variables: {
						data: {
							email: "test@email.xyz",
							token: "token",
						},
					},
				},
				result: {
					errors: [new GraphQLError("Internal server error.")],
				},
			},
		];

		const signinPO = SigninPO.render(Signin, mocks);

		// when
		await signinPO.setEmail("test@email.xyz");

		// then
		signinPO.expectButtonHasProperText("Next");

		// when
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		signinPO.expectButtonHasProperText("Sign in");

		// when
		await signinPO.setPassword("TestPassword1122");
		await signinPO.submitForm();

		// then
		await signinPO.expectLoaderDisappeared();
		await signinPO.expectTextDisplayed("User not confirmed.");
		await waitFor(() =>
			signinPO
				.expectSuccessCallback(mockNavigate)
				.toHaveBeenCalledWith(ROUTES.SIGNUP.CONFIRM, { state: { email: "test@email.xyz" } }),
		);

		await waitFor(() =>
			expect(showErrorToast).toHaveBeenCalledWith("Code sending failed. Please try again later."),
		);
	});
});
