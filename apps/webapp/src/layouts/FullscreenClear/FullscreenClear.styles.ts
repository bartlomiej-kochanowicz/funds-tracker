import { Box } from "components/atoms";
import styled, { css } from "styled-components";

export const Wrapper = styled(Box).attrs({
	$flex: true,
	$flexDirection: "column",
	$alignItems: "center",
	$justifyContent: "center",
})`
	width: 100%;
	height: 100%;
	height: var(--doc-height);

	${({ theme }) => css`
		padding: ${theme.padding.medium};
		background: ${theme.colors.background};
	`}
`;

export const InnerWrapper = styled(Box).attrs({
	$flex: true,
	$flexDirection: "column",
	$alignItems: "stretch",
})`
	width: 350px;
`;
