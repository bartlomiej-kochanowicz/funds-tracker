import { FC } from 'react';
import { Modal } from 'types/modal.type';

export const AddCashAccountModal = 'AddCashAccount';

export type AddCashAccountModalProps = {};

export const AddCashAccount: FC<Modal<AddCashAccountModalProps>> = ({ closeModal }) => (
  <div>
    <button
      type="button"
      onClick={closeModal}
    >
      AddCashAccount
    </button>
  </div>
);
