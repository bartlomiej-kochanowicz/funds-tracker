import styled, { css, DefaultTheme } from "styled-components";

interface IconProps {
	/* disable dafault html type for size */
	size?: undefined;
	$size: keyof DefaultTheme["font"]["size"];
	/* disable dafault html type for color */
	color?: undefined;
	$color?: keyof DefaultTheme["colors"];
}

export const StyledIcon = styled.span<IconProps>`
	${({ theme, $size, $color }) => css`
		width: ${theme.font.size[$size]};
		height: ${theme.font.size[$size]};

		${$color && `color: ${theme.colors[$color]};`}
	`}
`;
