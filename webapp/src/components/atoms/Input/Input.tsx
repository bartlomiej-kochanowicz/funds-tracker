import { forwardRef, HTMLProps } from 'react';
import { StyledInput, Wrapper, Error } from './Input.styles';

interface InputProps
  extends Pick<
    HTMLProps<HTMLInputElement>,
    'onChange' | 'id' | 'name' | 'placeholder' | 'type' | 'min' | 'max'
  > {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, type, ...rest }, ref) => (
  <Wrapper>
    <StyledInput
      error={Boolean(error)}
      type={type}
      ref={ref}
      {...rest}
    />

    {error && <Error>{error}</Error>}
  </Wrapper>
));

Input.displayName = 'Input';

Input.defaultProps = {
  error: undefined,
};
