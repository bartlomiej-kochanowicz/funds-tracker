import { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/styled.d';

export type FontableProps = {
  fontWeight: keyof DefaultTheme['font']['weight'];
  fontColor: Colors;
  fontSize: keyof DefaultTheme['font']['size'];
  lineHeight: string;
};

export const fontable = css<FontableProps>`
  ${({ fontWeight }) => css`
    font-weight: ${fontWeight};
  `}

  ${({ theme: { colors }, fontColor }) => css`
    color: ${colors[fontColor]};
  `}

  ${({
    theme: {
      font: { size },
    },
    fontSize,
  }) => css`
    font-size: ${size[fontSize]};
  `}

  ${({ lineHeight }) => css`
    line-height: ${lineHeight}rem;
  `}
`;

export type MarginableProps = {
  p: number;
  px: number;
  py: number;
  pt: number;
  pb: number;
  pl: number;
  pr: number;
  m: number;
  mx: number;
  my: number;
  mt: number;
  mb: number;
  ml: number;
  mr: number;
};

const offset = 0.25;

export const marginable = css<MarginableProps>`
  ${({ p }) =>
    p &&
    css`
      padding: ${p * offset}rem;
    `}

  ${({ px }) =>
    px &&
    css`
      padding-left: ${px * offset}rem;
      padding-right: ${px * offset}rem;
    `}

		${({ py }) =>
    py &&
    css`
      padding-top: ${py * offset}rem;
      padding-bottom: ${py * offset}rem;
    `}

		${({ pt }) =>
    pt &&
    css`
      padding-top: ${pt * offset}rem;
    `}
		${({ pb }) =>
    pb &&
    css`
      padding-bottom: ${pb * offset}rem;
    `}

		${({ pl }) =>
    pl &&
    css`
      padding-left: ${pl * offset}rem;
    `}

		${({ pr }) =>
    pr &&
    css`
      padding-right: ${pr * offset}rem;
    `}


		${({ m }) =>
    m &&
    css`
      margin: ${m * offset}rem;
    `}

		${({ mx }) =>
    mx &&
    css`
      margin-left: ${mx * offset}rem;
      margin-right: ${mx * offset}rem;
    `}

		${({ my }) =>
    my &&
    css`
      margin-top: ${my * offset}rem;
      margin-bottom: ${my * offset}rem;
    `}

		${({ mt }) =>
    mt &&
    css`
      margin-top: ${mt * offset}rem;
    `}

		${({ mb }) =>
    mb &&
    css`
      margin-bottom: ${mb * offset}rem;
    `}

		${({ ml }) =>
    ml &&
    css`
      margin-left: ${ml * offset}rem;
    `}

		${({ mr }) =>
    mr &&
    css`
      margin-right: ${mr * offset}rem;
    `}
`;
