import { screen } from '@testing-library/react';
import { SEND_CODE } from 'graphql/mutations';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

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
}));

describe('Confirm password tests', () => {
  it('redirect to signin when emain not exist', () => {
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
});
