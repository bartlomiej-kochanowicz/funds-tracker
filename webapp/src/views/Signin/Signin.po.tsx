import { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, getByTestId, render } from 'utils/test-utils';
import { unsafeCast } from 'utils/unsafeCast';

export class SigninPO {
  private elements: {
    chooseEmailInput: HTMLElement;
    chooseSubmitButton: HTMLElement;
  };

  private elementsByDataID(container: HTMLElement) {
    return {
      get chooseEmailInput() {
        return getByTestId(container, 'email-input');
      },
      get chooseSubmitButton() {
        return getByTestId(container, 'submit-button');
      },
    };
  }

  protected constructor(protected container: HTMLElement) {
    this.elements = this.elementsByDataID(container);
  }

  setEmail(value: string) {
    fireEvent.change(this.elements.chooseEmailInput, { target: { value } });
  }

  expectButtonHasProperText(text: string) {
    expect(this.elements.chooseSubmitButton).toHaveTextContent(text);
  }

  static render(SigninComponent: FC) {
    const { container } = render(
      <MemoryRouter>
        <SigninComponent />
      </MemoryRouter>,
    );

    return new SigninPO(unsafeCast.ElementToHTMLElement(container));
  }
}
