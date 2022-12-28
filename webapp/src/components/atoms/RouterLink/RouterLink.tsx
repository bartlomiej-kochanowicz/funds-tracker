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
} & FontableProps &
  MarginMixinProps &
  PaddingMixinProps;

export const RouterLink = styled(ReactRouterLink).withConfig({
  shouldForwardProp: prop => !['fontColor'].includes(prop),
})<RouterLinkProps>`
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

RouterLink.displayName = 'RouterLink';
