import { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/styled.d';

export type FontableProps = {
  textNowrap: boolean;
  muted: boolean;
  fontWeight: keyof DefaultTheme['font']['weight'];
  color: Colors;
  fontSize: keyof DefaultTheme['font']['size'];
  lineHeight: string | number;
};

export const fontable = css<FontableProps>`
  ${({ textNowrap }) =>
    textNowrap &&
    css`
      white-space: nowrap;
    `}

  ${({ muted }) =>
    muted &&
    css`
      opacity: 0.75;
    `}

  ${({ fontWeight }) => css`
    font-weight: ${fontWeight};
  `}

  ${({ theme: { colors }, color }) => css`
    color: ${colors[color]};
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
