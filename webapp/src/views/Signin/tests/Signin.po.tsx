import { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, getByTestId, queryByTestId, render, waitFor } from 'utils/test-utils';
import { unsafeCast } from 'utils/unsafeCast';

export class SigninPO {
  private elements: {
    chooseEmailInput: HTMLElement;
    chooseSubmitButton: HTMLElement;
    choosePasswordInput: HTMLElement;
  };

  private elementsByDataID(container: HTMLElement) {
    return {
      get chooseEmailInput() {
        return getByTestId(container, 'email-input');
      },
      get chooseSubmitButton() {
        return getByTestId(container, 'submit-button');
      },
      get choosePasswordInput() {
        return getByTestId(container, 'password-input');
      },
    };
  }

  protected constructor(protected container: HTMLElement, protected mockNavigate: jest.Mock) {
    this.elements = this.elementsByDataID(container);
  }

  setEmail(value: string) {
    fireEvent.change(this.elements.chooseEmailInput, { target: { value } });
  }

  submitForm() {
    fireEvent.click(this.elements.chooseSubmitButton);
  }

  setPassword(value: string) {
    fireEvent.change(this.elements.choosePasswordInput, { target: { value } });
  }

  expectButtonHasProperText(text: string) {
    expect(this.elements.chooseSubmitButton).toHaveTextContent(text);
  }

  async expectLoaderDisappeared() {
    await waitFor(() => {
      // await loader disappears
      expect(queryByTestId(this.container, 'button-loader')).not.toBeInTheDocument();
    });
  }

  get expectSuccessCallback() {
    return expect(this.mockNavigate);
  }

  static render(SigninComponent: FC, mockNavigate: jest.Mock) {
    const { container } = render(
      <MemoryRouter>
        <SigninComponent />
      </MemoryRouter>,
    );

    return new SigninPO(unsafeCast.ElementToHTMLElement(container), mockNavigate);
  }
}
