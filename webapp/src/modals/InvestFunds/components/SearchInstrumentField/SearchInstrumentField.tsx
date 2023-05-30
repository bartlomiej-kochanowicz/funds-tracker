import { SearchInstrumentCombobox } from 'components/molecules';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useSearchInstrumentCombobox } from 'hooks/useSearchInstrumentCombobox';
import { InvestFundsFormValues } from 'modals/InvestFunds/helpers/defaultValues';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

export const SearchInstrumentField = () => {
  const { t } = useTranslation();

  const { control, setValue } = useFormContext<InvestFundsFormValues>();

  const searchInstrumentProps = useSearchInstrumentCombobox({
    control,
    name: 'instrument',
    setValue,
  });

  const isPhone = useBreakpoint('phone', 'max');

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.instrument')}
      htmlFor="instrument"
    >
      <SearchInstrumentCombobox
        {...searchInstrumentProps}
        id="instrument"
        flexGrow={1}
        width={isPhone ? '100%' : 'auto'}
      />
    </FormField>
  );
};
