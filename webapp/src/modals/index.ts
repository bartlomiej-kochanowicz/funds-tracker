import { lazy } from 'react';

const AddCashAccount = lazy(() =>
  import('./AddCashAccount').then(({ AddCashAccount: component }) => ({
    default: component,
  })),
);

export const modals = {
  AddCashAccount,
};

export type Modals = keyof typeof modals;
