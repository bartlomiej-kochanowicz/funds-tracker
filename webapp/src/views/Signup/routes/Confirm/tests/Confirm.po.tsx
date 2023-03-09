import { MockedResponse } from '@apollo/client/testing';
import { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'utils/test-utils';
import { unsafeCast } from 'utils/unsafeCast';

export class ConfirmPO {
  private elements: {};

  private elementsByDataID(container: HTMLElement) {
    return {};
  }

  protected constructor(protected container: HTMLElement) {
    this.elements = this.elementsByDataID(container);
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
