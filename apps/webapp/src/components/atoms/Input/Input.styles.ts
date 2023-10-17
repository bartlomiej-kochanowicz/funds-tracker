import { darken, transparentize } from "color2k";
import { Icon } from "components/atoms/Icon";
import styled, { css } from "styled-components";
import { borderColor } from "styles/helpers";

export const StyledInput = styled.input<{ $error: boolean; $hasUnit: boolean; $hasIcon: boolean }>`
	border: none;
	width: 100%;

	${({ theme, $error, $hasUnit, $hasIcon }) => css`
		border-radius: ${theme.radius["0.7"]};
		font-weight: ${theme.font.weight[500]};
		background-color: ${theme.colors.gray100};
		color: ${theme.colors[$error ? "error" : "text"]};
		border: 2px solid ${theme.colors[borderColor({ isDark: theme.isDark, $error })]};
		padding: 0.5rem 1.25rem;
		${$hasUnit && "padding: 0.5rem 2.5rem 0.5rem 1.25rem;"}
		${$hasIcon && "padding: 0.5rem 1.25rem 0.5rem 2.5rem;"}

    &:focus-visible {
			outline: 2px solid ${theme.colors[$error ? "error" : "blue"]};
		}

		&:focus {
			background-color: ${darken(theme.colors.gray100, 0.05)};
			color: ${theme.colors[$error ? "error" : "blue"]};
			outline-style: solid;
			outline-width: 2px;
			outline-offset: -2px;
		}

		&:disabled {
			cursor: not-allowed;
			background-color: ${transparentize(theme.colors.gray100, 0.5)};
			color: ${transparentize(theme.colors.text, 0.5)};
			border: 2px solid ${transparentize(theme.colors.gray300, 0.5)};
		}

		&::placeholder {
			color: ${theme.colors.gray300};
		}

		&::-webkit-search-cancel-button {
			-webkit-appearance: none;
			appearance: none;
			height: 16px;
			width: 16px;
			background-size: 16px 16px;
			cursor: pointer;
			background-image: url("/src/assets/svgs/times-blue.svg");
		}

		&:hover:not(:focus) {
			&::-webkit-search-cancel-button {
				background-image: url(${theme.isDark
					? "/src/assets/svgs/times-white.svg"
					: "/src/assets/svgs/times-grey-300.svg"});
			}
		}
	`}

	&::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
`;

export const Wrapper = styled.div<{
	$width?: "auto" | "fit-content" | `${number}px` | `${number}%`;
	$flexGrow?: number;
}>`
	position: relative;
	width: ${({ $width }) => $width};

	${({ $flexGrow }) =>
		$flexGrow &&
		css`
			flex-grow: ${$flexGrow};
		`}

	.hidden-input {
		display: none;
	}
`;

export const Error = styled.span`
	position: absolute;
	left: 0;
	bottom: -1.25rem;

	${({ theme }) => css`
		font-size: ${theme.font.size["0.75"]};
		color: ${theme.colors.error};
	`}
`;

export const Unit = styled.span`
	color: ${({ theme }) => theme.colors.gray300};
	position: absolute;
	line-height: 2.75rem;
	right: 1.25rem;
	top: 0;
	bottom: 0;
`;

export const SearchIcon = styled(Icon)<{ $error: boolean }>`
	position: absolute;
	left: 1.25rem;
	top: 0;
	bottom: 0;
	height: 2.75rem;

	${({ theme, $error }) => css`
		color: ${theme.colors.gray300};
		&:has(+ input:focus) {
			color: ${theme.colors[$error ? "error" : "blue"]};
		}
	`}
`;