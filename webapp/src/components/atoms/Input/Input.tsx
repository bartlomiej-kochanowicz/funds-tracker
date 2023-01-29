import { forwardRef, HTMLProps, ReactNode } from 'react';
import { Text } from 'components/atoms/Text';
import { StyledInput, Wrapper, Error, Unit } from './Input.styles';

interface InputProps
  extends Pick<
    HTMLProps<HTMLInputElement>,
    'onChange' | 'onBlur' | 'id' | 'name' | 'placeholder' | 'min' | 'max' | 'disabled' | 'autoFocus'
  > {
  error?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  unit?: 'percentage';
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
  flexGrow?: number;
  label?: string | ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, unit, width = 'auto', flexGrow, label, ...rest }, ref) => (
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
        {...rest}
      />

      {error && <Error>{error}</Error>}

      {unit && <Unit>%</Unit>}
    </Wrapper>
  ),
);

Input.displayName = 'Input';
