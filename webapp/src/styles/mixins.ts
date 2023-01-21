import { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/styled.d';

export const resolveProps = <Props extends { className?: string; ['data-testid']?: string }>({
  className,
  'data-testid': dataTestId,
}: Props) => ({
  className,
  'data-testid': dataTestId,
});

export type FontableProps = {
  fontWeight?: keyof DefaultTheme['font']['weight'];
  fontColor?: Colors;
  fontSize?: keyof DefaultTheme['font']['size'];
  lineHeight?: `${string}rem`;
  textShadow?: boolean;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  maxWidth?: `${string}px` | `${string}%`;
  breakLine?: boolean;
};

export const fontable = css<FontableProps>`
  ${({ fontWeight }) => css`
    font-weight: ${fontWeight};
  `}

  ${({ theme: { colors }, fontColor }) =>
    css`
      color: ${fontColor ? colors[fontColor] : colors.text};
    `}

  ${({
    theme: {
      font: { size },
    },
    fontSize,
  }) =>
    fontSize &&
    css`
      font-size: ${size[fontSize]};
    `}

  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${lineHeight};
    `}

  ${({ textShadow }) =>
    textShadow &&
    css`
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}

    ${({ maxWidth }) =>
    maxWidth &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      width: ${maxWidth};
      white-space: nowrap;
    `}

  ${({ breakLine = false }) =>
    breakLine &&
    css`
      white-space: normal;
    `}
`;

const offset = 0.25;

export type PaddingMixinProps = {
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
};

export const paddingMixin = css<PaddingMixinProps>`
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
`;

export type MarginMixinProps = {
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
};

export const marginMixin = css<MarginMixinProps>`
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
