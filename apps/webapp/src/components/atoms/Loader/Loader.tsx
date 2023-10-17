import styled, { DefaultTheme, keyframes } from "styled-components";

type LoaderProps = {
	/* disable dafault html type for size */
	size?: undefined;
	$size?: keyof DefaultTheme["loader"]["size"];
	/* disable dafault html type for color */
	color?: undefined;
	$color?: keyof DefaultTheme["colors"];
	"data-testid"?: string;
};

const clip = keyframes`
	0% { transform: rotate(0); }
	100% { transform: rotate(360deg); }
`;

export const Loader = styled.div<LoaderProps>`
	align-self: center;
	background: transparent;
	box-sizing: border-box;
	width: ${({ $size = "medium", theme }) => theme.loader.size[$size]};
	height: ${({ $size = "medium", theme }) => theme.loader.size[$size]};
	border-radius: 100%;
	border: 3px solid ${({ $color = "text", theme }) => theme.colors[$color]};
	border-left: 3px solid transparent;
	border-bottom: 3px solid transparent;
	display: inline-block;
	animation: ${clip} 1s linear infinite;
	animation-fill-mode: both;
`;

Loader.displayName = "Loader";
