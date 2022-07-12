import { forwardRef, HTMLProps } from 'react';
import { StyledInput, Wrapper, Error, Unit } from './Input.styles';

interface InputProps
  extends Pick<
    HTMLProps<HTMLInputElement>,
    'onChange' | 'id' | 'name' | 'placeholder' | 'min' | 'max'
  > {
  error?: string | null;
  type?: 'text' | 'number' | 'password' | 'email';
  unit?: 'percentage' | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, unit, ...rest }, ref) => (
  <Wrapper>
    <StyledInput
      error={Boolean(error)}
      ref={ref}
      hasUnit={Boolean(unit)}
      {...rest}
    />

    {error && <Error>{error}</Error>}

    {unit && <Unit>%</Unit>}
  </Wrapper>
));

Input.displayName = 'Input';

Input.defaultProps = {
<<<<<<< HEAD
  error: null,
  type: 'text',
  unit: null,
=======
  error: undefined,
  type: 'text',
  unit: undefined,
>>>>>>> development
};
