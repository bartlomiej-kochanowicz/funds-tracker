import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Loader, Spacer, Spreader } from 'components/atoms';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';
import { Modal } from 'types/modal.type';
import { validationSchema } from './RenameCashAccount.schema';

export const MODAL_RENAME_CASH_ACCOUNT_MODAL = 'RenameCashAccount';

export interface RenameCashAccountProps {
  uuid: string;
  name: string;
  callback: (data: { name: string; uuid: string }) => void;
}

export const RenameCashAccount: FC<Modal<RenameCashAccountProps>> = ({
  uuid,
  name,
  callback,
  closeModal,
}) => {
  const { t } = useTranslation();

  const defaultValues = {
    name,
  };

  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
    register,
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema), mode: 'onChange' });

  return (
    <form>
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
          onClick={closeModal}
          flexGrow={1}
        >
          {t('common.cancel')}
        </Button>

        <Spreader spread="small" />

        <Button
          disabled={isSubmitting || !isValid || !isDirty}
          flexGrow={1}
          type="submit"
        >
          {isSubmitting && <Loader color="white" />}

          {!isSubmitting && t('page.cash_accounts.button.add_funds')}
        </Button>
      </Row>
    </form>
  );
};
