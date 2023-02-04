import { lazy } from 'react';

const CreateCashAccount = lazy(() =>
  import('./CreateCashAccount').then(({ CreateCashAccount: component }) => ({
    default: component,
  })),
);

const AddFundsCashAccount = lazy(() =>
  import('./AddFundsCashAccount').then(({ AddFundsCashAccount: component }) => ({
    default: component,
  })),
);

export const modals = {
  CreateCashAccount,
  AddFundsCashAccount,
};

export type ModalsNames = keyof typeof modals;
