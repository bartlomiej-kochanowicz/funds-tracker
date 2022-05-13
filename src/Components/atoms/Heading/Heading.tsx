import { createElement, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { resolveProps, fontable, FontableProps } from 'styles/mixins';

export type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const defaultProps = {
  level: 'h1' as Level,
  inline: false,
};

export type HeadingProps = {
  level?: Level;
  inline?: boolean;
  children: ReactNode;
  ['data-testid']?: string;
} & FontableProps &
  typeof defaultProps;

export const Heading = styled(
  ({ level, children, ...props }: { className: string } & HeadingProps) =>
    createElement(level, resolveProps(props), children),
)(
  ({ theme, level, inline }) => css`
    font-size: ${theme.heading[level].fontSize};
    font-weight: ${theme.font.weight[700]};

    ${inline &&
    css`
      display: inline-block;
    `}

    ${fontable}
  `,
);

Heading.displayName = 'Heading';

Heading.defaultProps = defaultProps;

export default Heading;
