import { FC, lazy, Suspense } from 'react';

import type { ManageCashAccountProps } from './ManageCashAccount';

const ManageCashAccount = lazy(() =>
  import('./ManageCashAccount').then(({ ManageCashAccount: component }) => ({
    default: component,
  })),
);

export const MODAL_MANAGE_CASH_ACCOUNT = 'ManageCashAccount';

export const Modal: FC<ManageCashAccountProps> = props => (
  <Suspense>
    <ManageCashAccount
      id={MODAL_MANAGE_CASH_ACCOUNT}
      {...props}
    />
  </Suspense>
);
