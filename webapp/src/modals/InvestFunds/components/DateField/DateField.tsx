import { Datepicker } from 'components/atoms';
import { useDatepickerForm } from 'components/atoms/Datepicker';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

export const DateField = () => {
  const { t } = useTranslation();

  const { control, setValue } = useFormContext();

  const datepickerProps = useDatepickerForm({
    control,
    name: 'date',
    setValue,
  });

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.purchase_date')}
      htmlFor="date"
    >
      <Datepicker {...datepickerProps} />
    </FormField>
  );
};
