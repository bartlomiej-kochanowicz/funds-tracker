import { Currency } from '__generated__/graphql';
import { Input } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

interface IPriceFieldProps {
  activeCurrency: Currency;
}

export const PriceField: FC<IPriceFieldProps> = ({ activeCurrency }) => {
  const { t } = useTranslation();

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.price')}
      htmlFor="price"
    >
      <Input
        id="price"
        type="currency"
        flexGrow={1}
        placeholder={t('modal.InvestFunds.form.input.price.placeholder')}
        currency={activeCurrency}
      />
    </FormField>
  );
};
