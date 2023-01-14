import { motion } from 'framer-motion';
import { useLazyQuery } from '@apollo/client';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';
import { GetCashAccountIntroductionQuery } from '__generated__/graphql';
import { Button, Heading, Loader, Spacer, Spreader, Text } from 'components/atoms';
import { MAX_CASH_ACCOUNTS } from 'constants/common';
import { useIntroductionContext } from 'views/Introduction/routes/Introduction/context';
import { GET_CASH_ACCOUNTS_INTRODUCTION } from 'graphql/query';
import { validationSchema } from './AddCashAccountsForm.schema';
import { FieldsWrapper } from './AddCashAccountsForm.styles';
import type { DefaultValues } from './AddCashAccountsForm.type';
import { EmptyList } from '../EmptyList';
import { CashAccountsField } from '../CashAccountsField';

export const AddCashAccountsForm = () => {
  const { t } = useTranslation();

  const { updateState, actions } = useIntroductionContext();

  const [getCashAccounts, { loading /* error */ /* , updateQuery */ }] =
    useLazyQuery<GetCashAccountIntroductionQuery>(GET_CASH_ACCOUNTS_INTRODUCTION);

  const onSubmit = async (values: DefaultValues) => {
    console.log(values);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    updateState(actions.CHANGE_TO_ADD_PORTFOLIOS);
  };

  const defaultValues = async () => {
    const { data } = await getCashAccounts();

    return data as GetCashAccountIntroductionQuery;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    control,
    getValues,
  } = useForm<DefaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cashAccounts',
  });

  const values = getValues();

  console.log(values);

  const handleAppend = () =>
    append({
      name: '',
      currency: 'USD',
    });

  if (loading) {
    return <Loader />;
  }

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
                  values={values}
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
