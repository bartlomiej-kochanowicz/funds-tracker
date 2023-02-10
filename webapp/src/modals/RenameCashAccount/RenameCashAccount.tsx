import { FC } from 'react';

export const MODAL_RENAME_CASH_ACCOUNT_MODAL = 'RenameCashAccount';

export interface RenameCashAccountProps {
  uuid: string;
  name: string;
}

export const RenameCashAccount: FC<RenameCashAccountProps> = ({ uuid, name }) => {
  return <div>rename cash account</div>;
};
