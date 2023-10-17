import styled, { css } from "styled-components";

export const Cell = styled.div<{ center?: boolean }>`
	${({ theme }) => css`
		padding: ${theme.padding.medium};
	`}
	display:flex;
	align-items: center;
	${({ center }) => center && "justify-content: center;"}
`;
