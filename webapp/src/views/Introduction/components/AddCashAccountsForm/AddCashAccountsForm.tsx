import { yupResolver } from '@hookform/resolvers/yup';
import { Heading, Spacer, Text } from 'components/atoms';
import { Currencies } from 'constants/selectors/currencies';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
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
        {fields.map(props => (
          <Field
            {...props}
            register={register}
            errors={errors}
          />
        ))}
      </form>
    </Column>
  );
};

AddCashAccountsForm.displayName = 'IntroductionAddCashAccountsForm';
