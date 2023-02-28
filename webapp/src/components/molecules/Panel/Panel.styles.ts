import { Box } from 'components/atoms';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const PanelWrapper = styled(Box)`
  ${({ theme: { colors, radius } }) => css`
    border-radius: ${radius.primary};
    border: 2px solid ${colors.gray200};
  `}
`;

export const PanelLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;

  svg {
    cursor: pointer;
  }
`;

export const Body = styled.div`
  ${({ theme: { padding } }) => css`
    padding: ${padding.large};
  `}
`;

export const BodyCentered = styled.div<{ minHeight?: `${number}px` }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${({ theme: { padding }, minHeight }) => css`
    padding: ${padding.large};

    ${minHeight && `min-height: ${minHeight};`}
  `}
`;

export const Chart = styled.div`
  padding: 0.5rem 0.75rem;
`;

export const Footer = styled.div`
  ${({ theme: { radius, colors, spacing } }) => css`
    background-color: ${colors.gray200};
    padding: ${spacing.small} ${spacing.large};
    border-radius: 0 0 ${radius.primary} ${radius.primary};
  `}
`;
