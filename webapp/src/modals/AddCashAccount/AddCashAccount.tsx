import { FC } from 'react';
import { Modal } from 'types/modal.type';

export const AddCashAccountModal = 'AddCashAccount';

export type AddCashAccountModalProps = {
  testprops: string;
};

export const AddCashAccount: FC<Modal<AddCashAccountModalProps>> = ({ closeModal, testprops }) => (
  <div>
    <button
      type="button"
      onClick={closeModal}
    >
      {testprops}
    </button>
  </div>
);
