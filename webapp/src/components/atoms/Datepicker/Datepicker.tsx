import pl from 'date-fns/locale/pl';
import { FC } from 'react';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { Input } from '../Input';

registerLocale('pl-PL', pl);

export const Datepicker: FC<ReactDatePickerProps> = props => {
  const { i18n } = useTranslation();

  return (
    <ReactDatePicker
      {...props}
      locale={i18n.language}
      dateFormat="dd-mm-yyyy"
      customInput={<Input type="date" />}
      showPopperArrow={false}
    />
  );
};

Datepicker.displayName = 'Datepicker';
