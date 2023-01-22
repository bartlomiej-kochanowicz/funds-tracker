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

type RouterLinkProps = {
  to: string;
  display?: 'inline' | 'inline-block' | 'block';
  textDecoration?: 'none' | 'underline';
} & FontableProps &
  MarginMixinProps &
  PaddingMixinProps;

export const RouterLink = styled(ReactRouterLink).withConfig({
  shouldForwardProp: prop => !['fontColor', 'maxWidth', 'textDecoration'].includes(prop),
})<RouterLinkProps>`
  ${fontable}
  ${marginMixin}
  ${paddingMixin}

  ${({ display = 'inline' }) => css`
    display: ${display};
  `}

  text-decoration: none;
  cursor: pointer;
  width: fit-content;

  &:hover {
    ${({ textDecoration = 'underline' }) => css`
      text-decoration: ${textDecoration};
    `}
  }
`;

RouterLink.displayName = 'RouterLink';
