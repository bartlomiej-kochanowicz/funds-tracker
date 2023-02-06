import { FC, Fragment } from 'react';
import { Button, Input, Loader, Spacer, Spreader } from 'components/atoms';
import { FaPlus } from 'react-icons/fa';
import { Row } from 'simple-flexbox';
import { useForm } from 'react-hook-form';
import { useInput } from 'hooks/useInput';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AddFundsToCashAccountMutation,
  AddFundsToCashAccountMutationVariables,
  Currency,
} from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import { ADD_FUNDS_TO_CASH_ACCOUNT } from 'graphql/mutations';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import { validationSchema } from './AddFundsCashAccountForm.schema';

interface AddFundsCashAccountFormProps {
  closeModal: () => void;
  callback: ({ balance, uuid }: { balance: number; uuid: string }) => void;
  uuid: string;
  currency: Currency;
}

export const AddFundsCashAccountForm: FC<AddFundsCashAccountFormProps> = ({
  closeModal,
  callback,
  currency,
  uuid,
}) => {
  const { t } = useTranslation();

  const defaultValues = {
    amount: 0,
  };

  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
    register,
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [addFundsToCashAcount] = useMutation<
    AddFundsToCashAccountMutation,
    AddFundsToCashAccountMutationVariables
  >(ADD_FUNDS_TO_CASH_ACCOUNT, {
    onCompleted: data => {
      callback({
        balance: data.addFundsToCashAccount.balance,
        uuid,
      });

      closeModal();

      showSuccessToast(t('toast.add_funds.success'));
    },
    onError: () => {
      closeModal();

      showErrorToast(t('service.unknown_error'));
    },
  });

  const onSubmit = async (data: typeof defaultValues) => {
    await addFundsToCashAcount({
      variables: {
        data: {
          amount: Number(data.amount),
          uuid,
        },
      },
    });
  };

  const amountInputProps = useInput<typeof defaultValues>({
    register,
    name: 'amount',
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="currency"
        currency={currency}
        defaultValue={defaultValues.amount}
        placeholder={t('modal.AddFundsCashAccount.input.placeholder')}
        {...amountInputProps}
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

          {!isSubmitting && (
            <Fragment>
              {t('page.cash_accounts.button.add_funds')} <Spreader spread="tiny" /> <FaPlus />
            </Fragment>
          )}
        </Button>
      </Row>
    </form>
  );
};