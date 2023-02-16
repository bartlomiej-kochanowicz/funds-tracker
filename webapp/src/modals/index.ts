import { lazy } from 'react';

const AddFundsCashAccount = lazy(() =>
  import('./AddFundsCashAccount').then(({ AddFundsCashAccount: component }) => ({
    default: component,
  })),
);

const ConfirmDeleteCashAccount = lazy(() =>
  import('./ConfirmDeleteCashAccount').then(({ ConfirmDeleteCashAccount: component }) => ({
    default: component,
  })),
);

const CreateCashAccount = lazy(() =>
  import('./CreateCashAccount').then(({ CreateCashAccount: component }) => ({
    default: component,
  })),
);

const ManageCashAccount = lazy(() =>
  import('./ManageCashAccount').then(({ ManageCashAccount: component }) => ({
    default: component,
  })),
);

const RenameCashAccount = lazy(() =>
  import('./RenameCashAccount').then(({ RenameCashAccount: component }) => ({
    default: component,
  })),
);

export const modals = {
  AddFundsCashAccount,
  ConfirmDeleteCashAccount,
  CreateCashAccount,
  ManageCashAccount,
  RenameCashAccount,
};
