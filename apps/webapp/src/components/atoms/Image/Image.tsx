import { css, styled } from "styled-components";

interface ImageProps {
	$width?: "auto" | "fit-content" | `${number}px` | `${number}%`;
	$height?: "auto" | "fit-content" | `${number}px` | `${number}%`;
}

export const Image = styled.img<ImageProps>`
	${({ $width, $height }) => css`
		${$width &&
		css`
			width: ${$width};
		`}

		${$height &&
		css`
			height: ${$height};
		`}
	`}
`;
