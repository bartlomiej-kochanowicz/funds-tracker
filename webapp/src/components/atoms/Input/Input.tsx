import { ChangeEvent, forwardRef, HTMLProps, ReactNode } from 'react';
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
  ({ error, unit, width = 'auto', flexGrow, label, type, onChange, ...rest }, ref) => {
    const { i18n } = useTranslation();

    if (type === 'currency') {
      const { currency } = rest as CurrencyInputProps;

      const onValueChange = (value: string | undefined) => {
        onChange?.({
          target: { value: value || '0', name: rest.name },
        } as ChangeEvent<HTMLInputElement>);
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

          <StyledCurrencyInput
            error={Boolean(error)}
            ref={ref}
            intlConfig={{ locale: i18n.language, currency }}
            {...rest}
            onValueChange={onValueChange}
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
          onChange={onChange}
          {...rest}
        />

        {error && <Error>{error}</Error>}

        {unit && <Unit>%</Unit>}
      </Wrapper>
    );
  },
);

Input.displayName = 'Input';
