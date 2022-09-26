/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Heading, Spacer, Text } from 'components/atoms';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Column, Row } from 'simple-flexbox';
import { DefaultValues } from './AddCashAccountsForm.type';

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
    accounts: [{ name: 'test', currency: 'PLN' as const }],
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
    resetField,
  } = useForm<DefaultValues>({
    defaultValues,
    // resolver: yupResolver(validationSchema),
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
    control,
    name: 'accounts',
    rules: {
      minLength: 1,
    },
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
        {t('add.instrument.description')}
      </Text>

      <Spacer space="large" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Column>
          {fields.map((field, index) => (
            <Field
              {...field}
              key={field.id}
              index={index}
              register={register}
              errors={errors}
            />
          ))}

          <Spacer space="large" />

          <Row justifyContent="flex-end">
            <Button
              size="large"
              type="submit"
              color="black"
              disabled={isSubmitting}
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