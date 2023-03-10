import { MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { getByTestId, render } from 'utils/test-utils';
import { unsafeCast } from 'utils/unsafeCast';

// code-input

export class ConfirmPO {
  private elements: {
    chooseCodeInput: HTMLElement;
    chooseSubmitButton: HTMLElement;
  };

  private user: UserEvent;

  private elementsByDataID(container: HTMLElement) {
    return {
      get chooseCodeInput() {
        return getByTestId(container, 'code-input');
      },
      get chooseSubmitButton() {
        return getByTestId(container, 'submit-button');
      },
    };
  }

  protected constructor(protected container: HTMLElement) {
    this.elements = this.elementsByDataID(container);
    this.user = userEvent.setup();
  }

  async setCode(value: string) {
    await this.user.type(this.elements.chooseCodeInput, value);
  }

  async submitForm() {
    await this.user.click(this.elements.chooseSubmitButton);
  }

  expectSuccessCallback(callback: jest.Mock) {
    return expect(callback);
  }

  static render(ConfirmComponent: FC, mocks?: readonly MockedResponse<Record<string, any>>[]) {
    const { container } = render(
      <MemoryRouter>
        <ConfirmComponent />
      </MemoryRouter>,
      { mocks },
    );

    return new ConfirmPO(unsafeCast.ElementToHTMLElement(container));
  }
}
