import { createElement, HTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { fontable, FontableProps, resolveProps } from 'styles/mixins';

type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IHeadingProps extends FontableProps, HTMLAttributes<HTMLHeadingElement> {
  $level?: Level;
  $inline?: boolean;
  children: ReactNode;
  ['data-testid']?: string;
}

export const Heading = styled(
  ({ $level = 'h1', children, ...props }: { className?: string } & IHeadingProps) =>
    createElement($level, resolveProps(props), children),
)(
  ({ theme, $level = 'h1', $inline }) => css`
    font-size: ${theme.heading[$level].fontSize};
    font-weight: ${theme.font.weight['700']};

    ${$inline &&
    css`
      display: inline-block;
    `}

    line-height: initial;

    ${fontable}
  `,
);

Heading.displayName = 'Heading';
