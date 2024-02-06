import { emitErrorToast, emitSuccessToast } from "@funds-tracker/ui";
import { waitFor } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { CONFIRM_SIGNUP } from "graphql/mutations/authentication/ConfirmSignup";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";
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

vi.mock("@funds-tracker/ui", async () => ({
	...(await vi.importActual("@funds-tracker/ui")),
	emitErrorToast: vi.fn(),
	emitSuccessToast: vi.fn(),
}));

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
	afterAll(() => {
		vi.clearAllMocks();
	});

	it("navigates to signin when email not exist", () => {
		ConfirmPO.render(Confirm);

		expect(Navigate).toBeCalledWith(
			{
				replace: true,
				to: "/signin",
			},
			{},
		);
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
			expect(mockUseNavigate).toBeCalledWith(ROUTES.HOME);
		});
	});

	it("resend code - success", async () => {
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
			expect(emitSuccessToast).toHaveBeenCalledWith(
				"Confirmation code has been sent to your email.",
			),
		);
	});

	it("resend code - fail", async () => {
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
			expect(emitErrorToast).toHaveBeenCalledWith("Code sending failed. Please try again later."),
		);
	});
});
