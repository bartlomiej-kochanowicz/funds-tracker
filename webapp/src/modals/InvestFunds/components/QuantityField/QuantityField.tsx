import { Input } from 'components/atoms';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

export const QuantityField = () => {
  const { t } = useTranslation();

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.quantity')}
      htmlFor="quantity"
    >
      <Input
        id="quantity"
        type="number"
        flexGrow={1}
        placeholder={t('modal.InvestFunds.form.input.quantity.placeholder')}
      />
    </FormField>
  );
};
