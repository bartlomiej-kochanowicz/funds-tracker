import { FC, lazy, Suspense } from 'react';

import type { ConfirmDeletePortfolioProps } from './ConfirmDeletePortfolio';

const ConfirmDeletePortfolio = lazy(() =>
  import('./ConfirmDeletePortfolio').then(({ ConfirmDeletePortfolio: component }) => ({
    default: component,
  })),
);

export const MODAL_CONFIRM_DELETE_PORTFOLIO = 'ConfirmDeletePortfolio';

export const Modal: FC<ConfirmDeletePortfolioProps> = props => (
  <Suspense>
    <ConfirmDeletePortfolio
      id={MODAL_CONFIRM_DELETE_PORTFOLIO}
      {...props}
    />
  </Suspense>
);
