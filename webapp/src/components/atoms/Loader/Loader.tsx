import styled, { keyframes } from 'styled-components';

export type Size = 'small' | 'medium' | 'large';
export type LoaderColors = 'white' | 'black' | 'blue';

const defaultProps = {
  size: 'medium' as Size,
  color: 'gray' as LoaderColors,
  'data-testid': 'loader',
};

type LoaderProps = {
  size?: Size;
  color?: LoaderColors;
  'data-testid'?: string;
} & typeof defaultProps;

const clip = keyframes`
	0% { transform: rotate(0); }
	100% { transform: rotate(360deg); }
`;

const StyledLoader = styled.div<LoaderProps>`
  align-self: center;
  background: transparent;
  box-sizing: border-box;
  width: ${({ size, theme }) => theme.loader.size[size]};
  height: ${({ size, theme }) => theme.loader.size[size]};
  border-radius: 100%;
  border: 3px solid ${({ color, theme }) => theme.loader.colors[color]};
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

Loader.displayName = 'Loader';

Loader.defaultProps = defaultProps;
