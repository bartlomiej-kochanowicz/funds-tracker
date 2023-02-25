import { FC, Fragment } from 'react';
import { Button, Icon, Input, Loader, Spacer, Spreader } from 'components/atoms';
import { FaPlus } from 'react-icons/fa';
import { Row } from 'simple-flexbox';
import { useForm } from 'react-hook-form';
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
import { useModal } from '@ebay/nice-modal-react';
import { validationSchema } from './AddFundsCashAccountForm.schema';

interface AddFundsCashAccountFormProps {
  callback: ({ balance, uuid }: { balance: number; uuid: string }) => void;
  uuid: string;
  currency: Currency;
}

export const AddFundsCashAccountForm: FC<AddFundsCashAccountFormProps> = ({
  callback,
  currency,
  uuid,
}) => {
  const { t } = useTranslation();

  const modal = useModal();

  const closeModal = modal.remove;

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
        {...register('amount')}
      />

      <Spacer />

      <Row justifyContent="flex-end">
        <Button
          color="tertiary"
          onClick={closeModal}
          flexGrow={1}
          minWidth="100px"
        >
          {t('common.cancel')}
        </Button>

        <Spreader spread="small" />

        <Button
          disabled={isSubmitting || !isValid || !isDirty}
          flexGrow={1}
          minWidth="170px"
          type="submit"
        >
          {isSubmitting && <Loader color="white" />}

          {!isSubmitting && (
            <Fragment>
              {t('page.cash_accounts.button.add_funds')}

              <Spreader spread="tiny" />

              <Icon icon={FaPlus} />
            </Fragment>
          )}
        </Button>
      </Row>
    </form>
  );
};
