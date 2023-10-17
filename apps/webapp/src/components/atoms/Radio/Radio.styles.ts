import radioCircle from "assets/svgs/radio-circle.svg";
import radioCircleFill from "assets/svgs/radio-circle-fill.svg";
import { transparentize } from "color2k";
import styled, { css } from "styled-components";

export const StyledRadio = styled.div`
	padding: 4px 8px;
	border: 0 solid transparent;
	display: inline-block;
	position: relative;
	cursor: default;
	outline: none;

	${({ theme: { colors, radius } }) => css`
		border-radius: ${radius["0.375"]};
		color: ${colors.text};

		&:hover {
			cursor: pointer;
		}

		&:focus {
			padding: 2px 6px;
			border: 2px solid ${colors.blue};
			background-color: ${transparentize(colors.blue, 0.85)};
		}
	`}

	&::before {
		position: relative;
		top: 2px;
		margin-right: 0.25rem;
		content: url(${radioCircle});
	}

	&[aria-checked="true"] {
		&::before {
			content: url(${radioCircleFill});
		}
	}
`;
