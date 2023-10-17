import styled, { css } from "styled-components";
import {
	fontable,
	FontableProps,
	marginMixin,
	MarginMixinProps,
	paddingMixin,
	PaddingMixinProps,
} from "styles/mixins";

type ButtonLinkProps = {
	$display?: "inline" | "inline-block" | "block";
} & FontableProps &
	MarginMixinProps &
	PaddingMixinProps;

export const ButtonLink = styled.button<ButtonLinkProps>`
	background: none;
	border: none;
	padding: unset;
	margin: unset;

	${fontable}
	${marginMixin}
  ${paddingMixin}

  ${({ $display = "inline" }) => css`
		display: ${$display};
	`}

  text-decoration: none;

	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;

ButtonLink.displayName = "ButtonLink";
