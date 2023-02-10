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

const ManageCashAccount = lazy(() =>
  import('./ManageCashAccount').then(({ ManageCashAccount: component }) => ({
    default: component,
  })),
);

export const modals = {
  CreateCashAccount,
  AddFundsCashAccount,
  ManageCashAccount,
};

export type ModalsNames = keyof typeof modals;
