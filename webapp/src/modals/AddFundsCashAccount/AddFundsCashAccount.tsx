import { Spacer, Text } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '__generated__/graphql';

import { Modal } from 'types/modal.type';
import { AddFundsCashAccountForm } from './AddFundsCashAccountForm';

export const MODAL_ADD_FUNDS_CASH_ACCOUNT = 'AddFundsCashAccount';

export type AddFundsCashAccountProps = {
  callback: ({ balance, uuid }: { balance: number; uuid: string }) => void;
  uuid: string;
  currency: Currency;
};

export const AddFundsCashAccount: FC<Modal<AddFundsCashAccountProps>> = ({
  closeModal,
  callback,
  uuid,
  currency,
}) => {
  const { t } = useTranslation();

  const isPhone = useBreakpoint('tablet', 'max');

  return (
    <Fragment>
      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        display="block"
        maxWidth={isPhone ? '300px' : '100%'}
        breakLine
      >
        {t('modal.AddFundsCashAccount.description')}
      </Text>

      <Spacer space="small" />

      <AddFundsCashAccountForm
        closeModal={closeModal}
        callback={callback}
        uuid={uuid}
        currency={currency}
      />
    </Fragment>
  );
};
