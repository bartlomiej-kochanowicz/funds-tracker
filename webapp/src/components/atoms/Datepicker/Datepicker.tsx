import { Icon } from 'components/atoms/Icon';
import { DefaultInputProps, Input } from 'components/atoms/Input';
import { Spreader } from 'components/atoms/Spreader';
import { getMonth, getYear } from 'date-fns';
import pl from 'date-fns/locale/pl';
import { FC, useMemo, useRef } from 'react';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Row } from 'simple-flexbox';

import { ArrowButton, StyledSelect } from './Datepicker.style';

registerLocale('pl-PL', pl);

interface DatepickerProps extends ReactDatePickerProps {
  inputProps?: DefaultInputProps;
}

export const Datepicker: FC<DatepickerProps> = ({ inputProps, ...props }) => {
  const { i18n } = useTranslation();

  const stopYear = getYear(props?.maxDate || new Date());
  const startYear = getYear(props?.minDate || new Date('01-01-1990'));

  const years = useMemo(
    () => Array.from({ length: stopYear - startYear + 1 }, (_, index) => startYear + index),
    [stopYear, startYear],
  );

  const currentYear = useRef<number>(new Date().getFullYear());

  const months = useMemo(() => {
    const { format } = new Intl.DateTimeFormat(i18n.language, { month: 'long' });

    return [...Array(12).keys()].map(m => format(new Date(Date.UTC(currentYear.current, m))));
  }, [i18n.language]);

  return (
    <ReactDatePicker
      {...props}
      locale={i18n.language}
      dateFormat="dd-MM-yyyy"
      customInput={
        <Input
          type="date"
          {...inputProps}
        />
      }
      showPopperArrow={false}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <Row justifyContent="space-between">
          <ArrowButton
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <Icon icon={FaChevronLeft} />
          </ArrowButton>

          <Row>
            <StyledSelect
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map(option => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </StyledSelect>

            <Spreader spread="0.25" />

            <StyledSelect
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            >
              {months.map(option => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </StyledSelect>
          </Row>

          <ArrowButton
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <Icon icon={FaChevronRight} />
          </ArrowButton>
        </Row>
      )}
    />
  );
};

Datepicker.displayName = 'Datepicker';
