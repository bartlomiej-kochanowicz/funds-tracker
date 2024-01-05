import { waitFor } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { CONFIRM_SIGNUP } from "graphql/mutations/authentication/ConfirmSignup";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes/paths";
import { Mock } from "vitest";

import { Confirm } from "../Confirm";
import { ConfirmPO } from "./Confirm.po";

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

vi.mock("helpers/showToast", () => ({ showErrorToast: vi.fn(), showSuccessToast: vi.fn() }));

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
	...((await vi.importActual("react-router-dom")) as typeof import("react-router-dom")),
	useNavigate: () => mockUseNavigate,
	Navigate: vi.fn(),
	useLocation: vi.fn(),
}));

vi.mock("contexts/UserContext", async () => ({
	...((await vi.importActual("contexts/UserContext")) as typeof import("contexts/UserContext")),
	useUserContext: vi.fn().mockReturnValue({ getUser: vi.fn() }),
}));

describe("Confirm password tests", () => {
	afterAll(vi.clearAllMocks);

	it("navigates to signin when emain not exist", () => {
		const mocks = [
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
						emailExist: {
							exist: true,
						},
					},
				},
			},
		];

		ConfirmPO.render(Confirm, mocks);

		expect(Navigate).toBeCalled();
	});

	it("navigates to introduction page on success confirmation", async () => {
		const email = "test@email.xyz";

		const mockUseLocation = useLocation as Mock;

		mockUseLocation.mockReturnValue({
			state: {
				email,
			},
		});

		const mocks = [
			{
				request: {
					query: SEND_CODE,
					variables: {
						data: {
							email,
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
			{
				request: {
					query: CONFIRM_SIGNUP,
					variables: {
						data: {
							email,
							code: "123456",
							token: "token",
						},
					},
				},
				result: {
					data: {
						confirmSignup: {
							success: true,
						},
					},
				},
			},
		];

		const confirmPO = ConfirmPO.render(Confirm, mocks);

		// when
		await confirmPO.setCode("123456");

		// when
		await confirmPO.submitForm();

		// then
		await waitFor(async () => {
			await confirmPO.expectSuccessCallback(mockUseNavigate).toBeCalledWith(ROUTES.HOME);
		});
	});

	it("send code properly", async () => {
		const email = "test@email.xyz";

		const mocks = [
			{
				request: {
					query: SEND_CODE,
					variables: {
						data: {
							email,
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

		const confirmPO = ConfirmPO.render(Confirm, mocks);

		await confirmPO.clickResendCodeButton();

		await waitFor(() =>
			expect(showSuccessToast).toHaveBeenCalledWith(
				"Confirmation code has been sent to your email.",
			),
		);
	});

	it("send code failure", async () => {
		const email = "test@email.xyz";

		const mocks = [
			{
				request: {
					query: SEND_CODE,
					variables: {
						data: {
							email,
							token: "token",
						},
					},
				},
				result: {
					errors: [new GraphQLError("Wrong email!")],
				},
			},
		];

		const confirmPO = ConfirmPO.render(Confirm, mocks);

		await confirmPO.clickResendCodeButton();

		await waitFor(() =>
			expect(showErrorToast).toHaveBeenCalledWith("Code sending failed. Please try again later."),
		);
	});
});
