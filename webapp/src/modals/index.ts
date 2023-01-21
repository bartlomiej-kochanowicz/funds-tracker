import { lazy } from 'react';

const CreateCashAccount = lazy(() =>
  import('./CreateCashAccount').then(({ CreateCashAccount: component }) => ({
    default: component,
  })),
);

export const modals = {
  CreateCashAccount,
};

export type ModalsNames = keyof typeof modals;
