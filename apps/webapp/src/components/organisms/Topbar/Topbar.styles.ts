import styled, { css } from "styled-components";

export const BackButton = styled.button`
	${({ theme }) => css`
		color: ${theme.colors.text};
		font-size: ${theme.font.size[1]};
		font-weight: ${theme.font.weight[700]};
		background-color: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		padding: 0;
	`}
`;
