import {
  UpdateCashAccountMutation,
  UpdateCashAccountMutationVariables,
} from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Loader, Spacer, Spreader } from 'components/atoms';
import { Modal } from 'components/molecules';
import { UPDATE_CASH_ACCOUNT } from 'graphql/mutations';
import { showErrorToast } from 'helpers/showToast';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';

import { validationSchema } from './RenameCashAccount.schema';

export interface RenameCashAccountProps {
  uuid: string;
  name: string;
  callback: (data: { name: string; uuid: string }) => void;
}

export const RenameCashAccount = NiceModal.create<RenameCashAccountProps>(
  ({ uuid, name, callback }) => {
    const { t } = useTranslation();

    const modal = useModal();

    const defaultValues = {
      name,
    };

    const {
      handleSubmit,
      formState: { isSubmitting, isValid, isDirty, errors },
      register,
    } = useForm({ defaultValues, resolver: yupResolver(validationSchema), mode: 'onChange' });

    const [updateCashAccount] = useMutation<
      UpdateCashAccountMutation,
      UpdateCashAccountMutationVariables
    >(UPDATE_CASH_ACCOUNT, {
      onCompleted: ({ updateCashAccount: { name: newName } }) => {
        callback({ name: newName, uuid });

        modal.remove();
      },
      onError: () => {
        modal.remove();

        showErrorToast(t('service.unknown_error'));
      },
    });

    const onSubmit = async ({ name: newName }: typeof defaultValues) => {
      await updateCashAccount({ variables: { data: { name: newName }, uuid } });
    };

    return (
      <Modal
        closeModal={modal.remove}
        modalName={t('modal.RenameCashAccount.name')}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            defaultValue={defaultValues.name}
            placeholder={t('common.input.name.placeholder')}
            {...register('name')}
            error={errors.name?.message}
          />

          <Spacer />

          <Row justifyContent="flex-end">
            <Button
              color="tertiary"
              onClick={modal.remove}
              flexGrow={1}
              minWidth="140px"
            >
              {t('common.cancel')}
            </Button>

            <Spreader spread="small" />

            <Button
              disabled={isSubmitting || !isValid || !isDirty}
              flexGrow={1}
              minWidth="140px"
              type="submit"
            >
              {isSubmitting && <Loader color="white" />}

              {!isSubmitting && t('common.save')}
            </Button>
          </Row>
        </form>
      </Modal>
    );
  },
);
