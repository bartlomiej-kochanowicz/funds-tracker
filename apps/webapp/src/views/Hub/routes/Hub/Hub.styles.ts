import styled, { css } from "styled-components";

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);

	${({ theme }) => css`
		${theme.breakpoints.phone.min} {
			grid-template-columns: repeat(5, 1fr);
		}
	`}
`;
