import { motion } from 'framer-motion';
import { Select } from 'components/atoms';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useTranslation } from 'react-i18next';
import { useUserContext } from 'contexts/UserContext';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelect } from 'hooks/useSelect';

export const DefaultCurrency = () => {
  const { t } = useTranslation();

  const { user } = useUserContext();

  const options = useMemo(
    () =>
      CURRENCIES_ARRAY.map(currency => ({
        label: t(`currency.${currency}`),
        value: currency,
      })),
    [t],
  );

  const defaultValues = {
    defaultCurrency: user.defaultCurrency,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<typeof defaultValues>({
    defaultValues,
    mode: 'onChange',
  });

  const defaultCurrencySelectProps = useSelect<typeof defaultValues>({
    register,
    name: 'defaultCurrency',
    errors,
  });

  const onSubmit = async (values: typeof defaultValues) => {
    console.log(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Select
          options={options}
          defaultValue={defaultValues.defaultCurrency}
          {...defaultCurrencySelectProps}
        />
      </form>
    </motion.div>
  );
};
