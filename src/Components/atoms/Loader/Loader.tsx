import styled, { keyframes } from 'styled-components';
import { Colors } from 'styles/theme';

const clip = keyframes`
	0% { transform: rotate(0); }
	100% { transform: rotate(360deg); }
`;

export type Size = 'small' | 'medium' | 'large';
export type LoaderColors = Colors.Blue | Colors.White | Colors.Navy;

const defaultProps = {
  size: 'medium' as Size,
  color: 'blue' as Colors,
  'data-testid': null,
};

type LoaderProps = {
  size?: Size;
  color?: LoaderColors;
  'data-testid'?: string | null;
} & typeof defaultProps;

const StyledLoader = styled.div<LoaderProps>`
  align-self: center;
  background: transparent;
  box-sizing: border-box;
  width: ${({ size, theme }) => theme.loader.size[size]};
  height: ${({ size, theme }) => theme.loader.size[size]};
  border-radius: 100%;
  margin: 0 auto ${({ size, theme }) => theme.loader.size[size]};
  border: 3px solid ${({ color }) => color};
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  display: inline-block;
  animation: ${clip} 1s linear infinite;
  animation-fill-mode: both;
`;

export const Loader = ({ size, color, 'data-testid': dataTestId }: LoaderProps): JSX.Element => (
  <StyledLoader
    color={color}
    size={size}
    data-testid={dataTestId}
  />
);

Loader.defaultProps = defaultProps;
