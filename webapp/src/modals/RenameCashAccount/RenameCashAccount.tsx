import { FC } from 'react';

export const MODAL_RENAME_CASH_ACCOUNT_MODAL = 'RenameCashAccount';

export interface RenameCashAccountProps {
  uuid: string;
  name: string;
  callback: (data: { name: string; uuid: string }) => void;
}

export const RenameCashAccount: FC<RenameCashAccountProps> = ({ uuid, name, callback }) => {
  return <div>rename cash account</div>;
};
