import { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/styled.d';

export const resolveProps = <
  Props extends { className?: string; ['data-testid']?: string; id?: string },
>({
  className,
  id,
  'data-testid': dataTestId,
}: Props) => ({
  className,
  'data-testid': dataTestId,
  id,
});

export type FontableProps = {
  fontWeight?: keyof DefaultTheme['font']['weight'];
  fontColor?: Colors;
  fontSize?: keyof DefaultTheme['font']['size'];
  lineHeight?: `${string}rem`;
  textShadow?: boolean;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  maxWidth?: `${string}px` | `${string}%` | 'auto';
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
      max-width: ${maxWidth};
      white-space: nowrap;
    `}

  ${({ breakLine = false }) =>
    breakLine &&
    css`
      white-space: normal;
    `}

  ${({ maxWidth }) =>
    maxWidth === 'auto' &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}
`;

export interface PaddingMixinProps {
  p?: keyof DefaultTheme['padding'];
  adjustMobile?: boolean;
}

export const paddingMixin = css<PaddingMixinProps>`
  ${({ p, theme }) =>
    p &&
    css`
      padding: ${theme.padding[p]};
    `}
`;

export type MarginMixinProps = {
  m?: keyof DefaultTheme['padding'];
};

export const marginMixin = css<MarginMixinProps>`
  ${({ m, theme }) =>
    m &&
    css`
      padding: ${theme.padding[m]};
    `}
`;
