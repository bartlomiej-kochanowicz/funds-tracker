import { motion } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Heading, Loader, Spacer, Spreader, Text } from 'components/atoms';
import { MAX_CASH_ACCOUNTS } from 'constants/common';
import { useFieldArray, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';
import { useIntroductionContext } from 'views/Introduction/routes/Introduction/context';
import { validationSchema } from './AddCashAccountsForm.schema';
import { FieldsWrapper } from './AddCashAccountsForm.styles';
import { DefaultValues } from './AddCashAccountsForm.type';
import { EmptyList } from './components/EmptyList';
import { Field } from './components/Field';

export const AddCashAccountsForm = () => {
  const { t } = useTranslation();

  const { updateState, actions } = useIntroductionContext();

  const onSubmit = async (values: DefaultValues) => {
    console.log(values);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    updateState(actions.CHANGE_TO_ADD_INSTRUMENT);
  };

  const defaultValues = {
    accounts: [],
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
    name: 'accounts',
  });

  const values = getValues();

  const handleAppend = () =>
    append({
      name: '',
      currency: 'USD',
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
          fontColor="darkGray"
          textAlign="center"
        >
          <Trans
            i18nKey="add.cash.accounts.description"
            components={{
              bold: (
                <Text
                  fontSize="0.875"
                  fontColor="darkGray"
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
            {fields.length === 0 ? <EmptyList handleAppend={handleAppend} /> : null}

            <FieldsWrapper>
              {fields.map((field, index) => (
                <Field
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
                color="black"
                onClick={handleAppend}
              >
                {t('add.cash.accounts.button.add')} <Spreader spread="tiny" /> <FaPlus />
              </Button>
            ) : null}

            <Spacer space="large" />

            <Button
              size="large"
              type="submit"
              color="black"
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
