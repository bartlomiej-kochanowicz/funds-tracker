import 'styled-components';
import { theme } from 'styles/theme';

export type Colors =
  | 'blueBase'
  | 'pinkBase'
  | 'blackBase'
  | 'grayBase'
  | 'silverBase'
  | 'white'
  | 'black';

declare module 'styled-components' {
  export type Theme = typeof theme;

  export interface DefaultTheme extends Theme {}
}
