import { forwardRef, HTMLProps, MutableRefObject, ReactNode, useRef } from 'react';
import { mergeRefs } from 'react-laag';
import { Text } from 'components/atoms/Text';
import { Currency } from '__generated__/graphql';
import { CurrencyInputProps as CurrencyInputFieldProps } from 'react-currency-input-field';
import { useTranslation } from 'react-i18next';
import { StyledInput, Wrapper, Error, Unit, StyledCurrencyInput } from './Input.styles';

interface InputCommonProps {
  error?: string;
  unit?: 'percentage';
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
  flexGrow?: number;
  label?: string | ReactNode;
  defaultValue?: string | number;
}

interface DefaultInputProps
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
  type?: 'text' | 'number' | 'password' | 'email';
}

interface CurrencyInputProps extends InputCommonProps, Omit<CurrencyInputFieldProps, 'width'> {
  type?: 'currency';
  currency: Currency;
}

type CtaInputProps = DefaultInputProps | CurrencyInputProps;

export const Input = forwardRef<HTMLInputElement, CtaInputProps>(
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
            intlConfig={{ locale: i18n.language, currency }}
            onValueChange={handleValueChange}
            defaultValue={rest.defaultValue}
            placeholder={rest.placeholder}
          />

          {error && <Error>{error}</Error>}

          {unit && <Unit>%</Unit>}
        </Wrapper>
      );
    }

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

        <StyledInput
          error={Boolean(error)}
          ref={ref}
          hasUnit={Boolean(unit)}
          type={type}
          {...rest}
        />

        {error && <Error>{error}</Error>}

        {unit && <Unit>%</Unit>}
      </Wrapper>
    );
  },
);

Input.displayName = 'Input';
