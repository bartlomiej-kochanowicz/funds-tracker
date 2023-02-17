import { useMutation } from '@apollo/client';
import { Button, Loader, Spacer, Spreader, Text } from 'components/atoms';
import { DELETE_CASH_ACCOUNT } from 'graphql/mutations';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Column, Row } from 'simple-flexbox';
import { Modal } from 'types/modal.type';
import {
  DeleteCashAccountMutation,
  DeleteCashAccountMutationVariables,
} from '__generated__/graphql';

export const MODAL_CONFIRM_DELETE_CASH_ACCOUNT = 'ConfirmDeleteCashAccount';

export interface ConfirmDeleteCashAccountProps {
  name: string;
  uuid: string;
  callback: (data: { uuid: string }) => void;
}

export const ConfirmDeleteCashAccount: FC<Modal<ConfirmDeleteCashAccountProps>> = ({
  name,
  uuid,
  callback,
  closeModal,
}) => {
  const { t } = useTranslation();

  const [deleteCashAccount, { loading }] = useMutation<
    DeleteCashAccountMutation,
    DeleteCashAccountMutationVariables
  >(DELETE_CASH_ACCOUNT, {
    onCompleted: () => {
      showSuccessToast(t('modal.ConfirmDeleteCashAccount.toast.success'));

      callback({ uuid });

      closeModal();
    },
    onError: () => {
      showErrorToast(t('modal.ConfirmDeleteCashAccount.toast.failure'));

      closeModal();
    },
  });

  const handleDelete = async () => {
    await deleteCashAccount({
      variables: {
        uuid,
      },
    });

    closeModal();
  };

  return (
    <Column>
      <Text
        fontSize="0.875"
        fontColor="gray400"
      >
        <Trans
          i18nKey="modal.ConfirmDeleteCashAccount.description"
          values={{ name }}
          components={{
            bold: (
              <Text
                fontSize="0.875"
                fontColor="gray400"
                textAlign="center"
                fontWeight="700"
              />
            ),
          }}
        />
      </Text>

      <Spacer />

      <Row>
        <Button
          color="tertiary"
          onClick={closeModal}
          width="50%"
        >
          {t('common.no')}
        </Button>

        <Spreader spread="small" />

        <Button
          width="50%"
          disabled={loading}
          onClick={handleDelete}
        >
          {loading && <Loader color="white" />}

          {!loading && t('common.yes')}
        </Button>
      </Row>
    </Column>
  );
};
