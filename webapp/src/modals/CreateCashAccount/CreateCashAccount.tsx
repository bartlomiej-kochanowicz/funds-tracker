import { FC } from 'react';
import { Modal } from 'types/modal.type';

export const MODAL_CREATE_CASH_ACCOUNT = 'CreateCashAccount';

export type CreateCashAccountModalProps = {};

export const CreateCashAccount: FC<Modal<CreateCashAccountModalProps>> = ({ closeModal }) => {
  return (
    <div>
      <button
        type="button"
        onClick={closeModal}
      >
        CreateCashAccount
      </button>
    </div>
  );
};
