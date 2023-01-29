import { ReactNode } from 'react';
import { Colors, Radius } from 'styles/styled';
import { PaddingMixinProps } from 'styles/mixins';
import { StyledWrapper } from './Box.styled';

interface BoxProps extends PaddingMixinProps {
  children: ReactNode;
  backgroundColor?: Colors;
  borderRadius?: Radius;
}

export const Box = ({ children, ...rest }: BoxProps) => (
  <StyledWrapper {...rest}>{children}</StyledWrapper>
);

Box.displayName = 'Box';
