import { Spacer, Text } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from 'types/modal.type';

export const MODAL_ADD_FUNDS_CASH_ACCOUNT = 'AddFundsCashAccount';

export type AddFundsCashAccountProps = {
  callback: () => void;
};

export const AddFundsCashAccount: FC<Modal<AddFundsCashAccountProps>> = ({
  closeModal,
  callback,
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
        {t('modal.CreateCashAccount.description')}
      </Text>

      <Spacer space="small" />

      <div>form</div>
    </Fragment>
  );
};
