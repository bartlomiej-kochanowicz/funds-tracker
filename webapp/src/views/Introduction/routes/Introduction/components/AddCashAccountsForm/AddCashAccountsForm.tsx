import { motion } from 'framer-motion';
import { useMutation } from '@apollo/client';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';
import {
  Currency,
  IntroductionCreateCashAccountsInput,
  IntroductionCreateCashAccountsMutation,
  IntroductionCreateCashAccountsMutationVariables,
} from '__generated__/graphql';
import { Button, Heading, Loader, Spacer, Spreader, Text } from 'components/atoms';
import { MAX_CASH_ACCOUNTS } from 'constants/common';
import { useIntroductionContext } from 'views/Introduction/routes/Introduction/context';
import { showErrorToast } from 'helpers/showToast';
import { INTRODUCTION_CREATE_CASH_ACCOUNT } from 'graphql/mutations/IntroductionCreateCashAccounts';
import { useUserContext } from 'contexts/UserContext';
import { validationSchema } from './AddCashAccountsForm.schema';
import { FieldsWrapper } from './AddCashAccountsForm.styles';
import { EmptyList } from '../EmptyList';
import { CashAccountsField } from '../CashAccountsField';

export const AddCashAccountsForm = () => {
  const { t } = useTranslation();

  const { updateState, actions } = useIntroductionContext();

  const { user } = useUserContext();

  const [createCashAccounts] = useMutation<
    IntroductionCreateCashAccountsMutation,
    IntroductionCreateCashAccountsMutationVariables
  >(INTRODUCTION_CREATE_CASH_ACCOUNT, {
    onCompleted: () => {
      updateState(actions.CHANGE_TO_ADD_PORTFOLIOS);
    },
    onError: () => {
      showErrorToast(t('service.unknown_error'));
    },
  });

  const onSubmit = async (values: IntroductionCreateCashAccountsInput) => {
    await createCashAccounts({
      variables: {
        data: values,
      },
    });
  };

  const defaultValues = {
    cashAccounts: [
      {
        name: '',
        currency: user.defaultCurrency,
      },
    ],
  } satisfies IntroductionCreateCashAccountsInput;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    control,
    getValues,
  } = useForm<IntroductionCreateCashAccountsInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const values = getValues();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cashAccounts',
  });

  const handleAppend = () =>
    append({
      name: '',
      currency: Currency.Usd,
    });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Column>
        <Heading textAlign="center">{t('add.cash.accounts.title')}</Heading>

        <Spacer space="small" />

        <Text
          fontSize="0.875"
          fontColor="gray400"
          textAlign="center"
        >
          <Trans
            i18nKey="add.cash.accounts.description"
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

        <Spacer space="large" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Column>
            {fields.length === 0 ? (
              <EmptyList
                handleAppend={handleAppend}
                i18n={{
                  title: t('add.cash.accounts.empty'),
                  button: t('add.cash.accounts.button.add'),
                }}
              />
            ) : null}

            <FieldsWrapper>
              {fields.map((field, index) => (
                <CashAccountsField
                  key={field.id}
                  index={index}
                  register={register}
                  errors={errors}
                  defaultValue={values.cashAccounts[index].currency}
                  remove={remove}
                />
              ))}
            </FieldsWrapper>

            <Spacer space="tiny" />

            {fields.length > 0 && fields.length < MAX_CASH_ACCOUNTS ? (
              <Button
                color="secondary"
                onClick={handleAppend}
              >
                {t('add.cash.accounts.button.add')} <Spreader spread="tiny" /> <FaPlus />
              </Button>
            ) : null}

            <Spacer space="large" />

            <Button
              size="large"
              type="submit"
              disabled={isSubmitting || !isValid || !isDirty}
              width="100%"
            >
              {isSubmitting ? <Loader color="white" /> : t('add.cash.accounts.submit')}
            </Button>
          </Column>
        </form>
      </Column>
    </motion.div>
  );
};

AddCashAccountsForm.displayName = 'IntroductionAddCashAccountsForm';
