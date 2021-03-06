import { createElement, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { resolveProps, fontable, FontableProps } from 'styles/mixins';

type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = {
  level?: Level;
  inline?: boolean;
  children: ReactNode;
  ['data-testid']?: string;
} & FontableProps;

export const Heading = styled(
  ({ level = 'h1', children, ...props }: { className?: string } & HeadingProps) =>
    createElement(level, resolveProps(props), children),
)(
  ({ theme, level = 'h1', inline }) => css`
    font-size: ${theme.heading[level].fontSize};
    font-weight: ${theme.font.weight['700']};

    ${inline &&
    css`
      display: inline-block;
    `}

    line-height: initial;

    ${fontable}
  `,
);

Heading.displayName = 'Heading';

export default Heading;
