import { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { getByTestId, render } from 'utils/test-utils';
import { unsafeCast } from 'utils/unsafeCast';

export class SigninPO {
  private elements: {
    chooseEmailInput: HTMLElement;
  };

  private elementsByDataID(container: HTMLElement) {
    return {
      get chooseEmailInput() {
        return getByTestId(container, 'email-input');
      },
    };
  }

  protected constructor(protected container: HTMLElement) {
    this.elements = this.elementsByDataID(container);
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
