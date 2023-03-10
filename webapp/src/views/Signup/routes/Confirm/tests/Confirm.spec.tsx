import { waitFor } from '@testing-library/react';
import { CONFIRM_SIGNUP, SEND_CODE } from 'graphql/mutations';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Confirm } from '../Confirm';
import { ConfirmPO } from './Confirm.po';

jest.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptcha: ({
    onVerify,
    refreshReCaptcha,
  }: {
    onVerify: (token: string) => string;
    refreshReCaptcha: boolean;
  }) => {
    useEffect(() => {
      onVerify('token');
    }, [onVerify, refreshReCaptcha]);

    return null;
  },
}));

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  Navigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('contexts/UserContext', () => ({
  ...jest.requireActual('contexts/UserContext'),
  useUserContext: jest.fn().mockReturnValue({ getUser: jest.fn() }),
}));

describe('Confirm password tests', () => {
  it('navigates to signin when emain not exist', () => {
    const mocks = [
      {
        request: {
          query: SEND_CODE,
          variables: {
            data: {
              email: 'test@email.xyz',
              token: 'token',
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

  it('navigates to introduction page on success confirmation', async () => {
    const email = 'test@email.xyz';

    const mockUseLocation = useLocation as jest.Mock;

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
              token: 'token',
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
              code: '123456',
              token: 'token',
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

    const confirmPO = await ConfirmPO.render(Confirm, mocks);

    // when
    await confirmPO.setCode('123456');

    // when
    await confirmPO.submitForm();

    // then
    await waitFor(async () => {
      await confirmPO.expectSuccessCallback(mockUseNavigate).toBeCalledWith('/introduction');
    });
  });
});
