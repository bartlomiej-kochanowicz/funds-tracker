import { Link as ReactRouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  fontable,
  FontableProps,
  marginMixin,
  MarginMixinProps,
  paddingMixin,
  PaddingMixinProps,
} from 'styles/mixins';

type LinkProps = {
  to: string;
  display?: 'inline' | 'inline-block' | 'block';
} & FontableProps &
  MarginMixinProps &
  PaddingMixinProps;

export const Link = styled(ReactRouterLink)<LinkProps>`
  ${fontable}
  ${marginMixin}
  ${paddingMixin}

  ${({ display = 'inline' }) => css`
    display: ${display};
  `}

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

Link.displayName = 'Link';
