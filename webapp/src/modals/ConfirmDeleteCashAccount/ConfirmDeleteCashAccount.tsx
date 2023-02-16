import { FC } from 'react';
import { Modal } from 'types/modal.type';

export const MODAL_CONFIRM_DELETE_CASH_ACCOUNT = 'ConfirmDeleteCashAccount';

export interface ConfirmDeleteCashAccountProps {
  name: string;
}

export const ConfirmDeleteCashAccount: FC<Modal<ConfirmDeleteCashAccountProps>> = ({ name }) => {
  return <div>ConfirmDeleteCashAccount - {name}</div>;
};
