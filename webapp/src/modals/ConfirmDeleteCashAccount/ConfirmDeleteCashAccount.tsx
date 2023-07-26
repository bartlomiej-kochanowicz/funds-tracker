import {
  DeleteCashAccountMutation,
  DeleteCashAccountMutationVariables,
} from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Button, Loader, Spacer, Spreader, Text } from 'components/atoms';
import { Modal } from 'components/molecules';
import { DELETE_CASH_ACCOUNT } from 'graphql/mutations/cashAccounts/DeleteCashAccount';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import { Trans, useTranslation } from 'react-i18next';

export interface ConfirmDeleteCashAccountProps {
  name: string;
  uuid: string;
  callback: (data: { uuid: string }) => void;
}

export const ConfirmDeleteCashAccount = NiceModal.create<ConfirmDeleteCashAccountProps>(
  ({ name, uuid, callback }) => {
    const { t } = useTranslation();

    const modal = useModal();

    const [deleteCashAccount, { loading }] = useMutation<
      DeleteCashAccountMutation,
      DeleteCashAccountMutationVariables
    >(DELETE_CASH_ACCOUNT, {
      onCompleted: () => {
        showSuccessToast(t('modal.ConfirmDeleteCashAccount.toast.success'));

        callback({ uuid });

        modal.remove();
      },
      onError: () => {
        showErrorToast(t('modal.ConfirmDeleteCashAccount.toast.failure'));

        modal.remove();
      },
    });

    const handleDelete = async () => {
      await deleteCashAccount({
        variables: {
          uuid,
        },
      });

      modal.remove();
    };

    return (
      <Modal
        closeModal={modal.remove}
        modalName={t('modal.ConfirmDeleteCashAccount.name')}
      >
        <Box
          $flex
          $flexDirection="column"
        >
          <Text
            $fontSize="0.875"
            $fontColor="gray400"
          >
            <Trans
              i18nKey="modal.ConfirmDeleteCashAccount.description"
              values={{ name }}
              components={{
                bold: (
                  <Text
                    $fontSize="0.875"
                    $fontColor="gray400"
                    $textAlign="center"
                    $fontWeight="700"
                  />
                ),
              }}
            />
          </Text>

          <Spacer />

          <Box $flex>
            <Button
              color="tertiary"
              onClick={modal.remove}
              width="50%"
            >
              {t('common.no')}
            </Button>

            <Spreader $spread="0.5" />

            <Button
              width="50%"
              disabled={loading}
              onClick={handleDelete}
            >
              {loading && <Loader color="white" />}

              {!loading && t('common.yes')}
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  },
);
