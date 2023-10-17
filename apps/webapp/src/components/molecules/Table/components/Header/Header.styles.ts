import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ $gridTemplateColumns: string }>`
	display: grid;

	${({ theme, $gridTemplateColumns }) => css`
		grid-template-columns: ${$gridTemplateColumns};

		& > div {
			border-bottom: 1px solid ${theme.colors.gray200};
		}

		& > div:last-child {
			border-right: none;
		}
	`}
`;
