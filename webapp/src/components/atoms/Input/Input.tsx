import { Currency } from '__generated__/graphql';
import { Text } from 'components/atoms/Text';
import { forwardRef, HTMLProps, MutableRefObject, ReactNode, useRef } from 'react';
import { CurrencyInputProps as CurrencyInputFieldProps } from 'react-currency-input-field';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { mergeRefs } from 'react-laag';

import { Error, SearchIcon, StyledCurrencyInput, StyledInput, Unit, Wrapper } from './Input.styles';

interface InputCommonProps {
  error?: string;
  unit?: string;
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
  flexGrow?: number;
  label?: string | ReactNode;
  defaultValue?: string | number;
}

export interface DefaultInputProps
  extends InputCommonProps,
    Pick<
      HTMLProps<HTMLInputElement>,
      | 'onChange'
      | 'onBlur'
      | 'id'
      | 'name'
      | 'placeholder'
      | 'min'
      | 'max'
      | 'disabled'
      | 'autoFocus'
    > {
  type?: 'text' | 'number' | 'password' | 'email' | 'date';
}

export interface CurrencyInputProps
  extends InputCommonProps,
    Omit<CurrencyInputFieldProps, 'width'> {
  type?: 'currency';
  currency: Currency;
  unit?: undefined;
}

export interface SearchInputProps extends InputCommonProps, Omit<CurrencyInputFieldProps, 'width'> {
  type?: 'search';
  currency?: undefined;
  unit?: undefined;
}

export type InputProps = DefaultInputProps | CurrencyInputProps | SearchInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, unit, width = 'auto', flexGrow, label, type, ...rest }, ref) => {
    const { i18n } = useTranslation();

    const curencyInputRef = useRef() as MutableRefObject<HTMLInputElement> & {
      current: {
        _valueTracker: {
          setValue: (value: string) => void;
        };
      };
    };

    if (type === 'currency') {
      const { currency } = rest as CurrencyInputProps;

      // special handling for currency input liblary
      const handleValueChange = (value?: string) => {
        curencyInputRef.current.setAttribute('value', value || '');

        const lastValue = curencyInputRef.current.value;

        curencyInputRef.current.value = value || '';

        const event = new Event('input', { bubbles: true });

        // eslint-disable-next-line no-underscore-dangle
        const tracker = curencyInputRef.current._valueTracker;

        if (tracker) {
          tracker.setValue(lastValue);
        }

        curencyInputRef.current.dispatchEvent(event);
      };

      return (
        <Wrapper
          width={width}
          flexGrow={flexGrow}
        >
          <input
            className="hidden-input"
            ref={mergeRefs(ref, curencyInputRef)}
            {...rest}
          />

          {label && (
            <Text
              fontSize="0.875"
              fontColor="gray400"
            >
              {label}
            </Text>
          )}

          <StyledCurrencyInput
            error={Boolean(error)}
            aria-invalid={Boolean(error)}
            intlConfig={{ locale: i18n.language, currency }}
            onValueChange={handleValueChange}
            defaultValue={rest.defaultValue}
            placeholder={rest.placeholder}
          />

          {error && <Error role="alert">{error}</Error>}

          {unit && <Unit>%</Unit>}
        </Wrapper>
      );
    }

    const hasIcon = type === 'search' || type === 'date';
    const hasUnit = Boolean(unit);
    const hasError = Boolean(error);

    const icon = {
      search: FaSearch,
      date: FaCalendarAlt,
    };

    return (
      <Wrapper
        width={width}
        flexGrow={flexGrow}
      >
        {label && (
          <Text
            fontSize="0.875"
            fontColor="gray400"
          >
            {label}
          </Text>
        )}

        {hasIcon && (
          <SearchIcon
            icon={icon[type as 'search' | 'date']}
            error={hasError}
          />
        )}

        <StyledInput
          error={hasError}
          aria-invalid={hasError}
          ref={ref}
          hasUnit={hasUnit}
          hasIcon={hasIcon}
          type={type === 'date' ? undefined : type}
          {...rest}
        />

        {error && <Error role="alert">{error}</Error>}

        {unit && <Unit>{unit}</Unit>}
      </Wrapper>
    );
  },
);

Input.displayName = 'Input';
