import { MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { FC } from "react";
import { MemoryRouter } from "react-router-dom";
import { findByText, getByTestId, queryByTestId, render, waitFor } from "utils/test-utils";
import { unsafeCast } from "utils/unsafeCast";

export class SigninPO {
	private elements: {
		chooseEmailInput: HTMLElement;
		chooseSubmitButton: HTMLElement;
		choosePasswordInput: HTMLElement;
	};

	private user: UserEvent;

	private elementsByDataID(container: HTMLElement) {
		return {
			get chooseEmailInput() {
				return getByTestId(container, "email-input");
			},
			get chooseSubmitButton() {
				return getByTestId(container, "submit-button");
			},
			get choosePasswordInput() {
				return getByTestId(container, "password-input");
			},
		};
	}

	protected constructor(protected container: HTMLElement) {
		this.elements = this.elementsByDataID(container);
		this.user = userEvent.setup();
	}

	async setEmail(value: string) {
		await this.user.type(this.elements.chooseEmailInput, value);
	}

	async submitForm() {
		await this.user.click(this.elements.chooseSubmitButton);
	}

	async setPassword(value: string) {
		await this.user.type(this.elements.choosePasswordInput, value);
	}

	expectButtonHasProperText(text: string) {
		expect(this.elements.chooseSubmitButton).toHaveTextContent(text);
	}

	async expectLoaderDisappeared() {
		await waitFor(() => {
			// await loader disappears
			expect(queryByTestId(this.container, "button-loader")).not.toBeInTheDocument();
		});
	}

	async expectTextDisplayed(text: string) {
		return findByText(this.container, text, { exact: false });
	}

	static render(SigninComponent: FC, mocks?: readonly MockedResponse<Record<string, any>>[]) {
		const { container } = render(
			<MemoryRouter>
				<SigninComponent />
			</MemoryRouter>,
			{ mocks },
		);

		return new SigninPO(unsafeCast.ElementToHTMLElement(container));
	}
}
