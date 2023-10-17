import styled, { css, DefaultTheme } from "styled-components";

export type Space = keyof DefaultTheme["spacing"];

export type SpacerProps = {
	$space?: Space;
	"data-testid"?: string;
};

const StyledSpacer = styled.span<SpacerProps>`
	display: block;

	${({ theme: { spacing }, $space = "1" }) => css`
		padding: ${spacing[$space]} 0;
	`}
`;

export const Spacer = ({ $space, "data-testid": dataTestId = "spacer" }: SpacerProps) => (
	<StyledSpacer $space={$space} data-testid={dataTestId} />
);

Spacer.displayName = "Spacer";
