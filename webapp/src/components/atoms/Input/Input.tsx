import { forwardRef, HTMLProps } from 'react';
import { StyledInput, Wrapper, Error } from './Input.styles';

interface InputProps
  extends Pick<HTMLProps<HTMLInputElement>, 'onChange' | 'id' | 'name' | 'placeholder' | 'type'> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...rest }, ref) => (
  <Wrapper>
    <StyledInput
      error={Boolean(error)}
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
