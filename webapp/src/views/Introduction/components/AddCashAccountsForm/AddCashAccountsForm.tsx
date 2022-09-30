import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Heading, Spacer, Spreader, Text } from 'components/atoms';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';
import { validationSchema } from './AddCashAccountsForm.schema';
import { FieldsWrapper } from './AddCashAccountsForm.styles';
import { DefaultValues } from './AddCashAccountsForm.type';
import { EmptyList } from './components/EmptyList';
import { Field } from './components/Field';

export const AddCashAccountsForm = () => {
  const { t } = useTranslation();

  const onSubmit = async (values: DefaultValues) => {
    console.log(values);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
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
    mode: 'onBlur',
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
    <Column>
      <Heading textAlign="center">{t('add.cash.accounts.title')}</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="darkGray"
        textAlign="center"
      >
        {t('add.cash.accounts.description')}
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

          {fields.length > 0 ? (
            <Button
              color="black"
              onClick={handleAppend}
            >
              {t('add.cash.accounts.button.add')} <Spreader spread="tiny" /> <FaPlus />
            </Button>
          ) : null}

          <Spacer space="large" />

          <Row justifyContent="flex-end">
            <Button
              size="large"
              type="submit"
              color="black"
              disabled={isSubmitting || !isValid || !isDirty}
              width="100%"
            >
              Accept & Next
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
};

AddCashAccountsForm.displayName = 'IntroductionAddCashAccountsForm';
