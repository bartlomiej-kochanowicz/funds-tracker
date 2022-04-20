import 'styled-components';
import { theme } from 'styles/theme';

export type Colors = keyof typeof theme.colors;
export type ButtonColors = keyof typeof theme.buttonColors;

declare module 'styled-components' {
  type Theme = typeof theme;

  export interface DefaultTheme extends Theme {}
}
