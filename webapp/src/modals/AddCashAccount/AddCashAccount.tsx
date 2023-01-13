import { FC } from 'react';
import { Modal } from 'types/modal.type';

export const AddCashAccount: FC<Modal<{}>> = ({ closeModal }) => (
  <div>
    <button
      type="button"
      onClick={closeModal}
    >
      open new modal
    </button>
  </div>
);
