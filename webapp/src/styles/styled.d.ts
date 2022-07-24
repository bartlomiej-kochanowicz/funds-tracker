import 'styled-components';
import { theme } from 'styles/theme';

export type Colors = keyof typeof theme.colors;

export type Radius = keyof typeof theme.radius;

declare module 'styled-components' {
  type Theme = typeof theme;

  export interface DefaultTheme extends Theme {}
}
