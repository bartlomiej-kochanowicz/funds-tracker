import { Spacer, Text } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from 'types/modal.type';
import { CreateCashAccountMutation } from '__generated__/graphql';
import { CreateCashAccountForm } from './CreateCashAccountForm';

export const MODAL_CREATE_CASH_ACCOUNT = 'CreateCashAccount';

export type CreateCashAccountModalProps = {
  callback: (data: CreateCashAccountMutation) => void;
};

export const CreateCashAccount: FC<Modal<CreateCashAccountModalProps>> = ({
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

      <CreateCashAccountForm
        closeModal={closeModal}
        callback={callback}
      />
    </Fragment>
  );
};
