import { customMediaQuery } from 'helpers/customMediaQuery';
import { rem } from 'helpers/units';

export enum Colors {
  Blue = 'hsla(230, 62%, 50%, 1)',
  Pink = 'hsla(5, 100%, 75%, 1)',
  Navy = 'hsla(234, 51%, 17%, 1)',
  Gray = 'hsla(226, 8%, 69%, 1)',
  Silver = 'hsla(0, 0%, 96%, 1)',
  White = 'hsla(0, 0%, 100%, 1)',
  Black = 'hsla(0, 0%, 0%, 1)',
  Transparent = 'hsla(0, 0%, 0%, 0)',
}

export const theme = {
  colors: {
    blue: Colors.Blue,
    pink: Colors.Pink,
    navy: Colors.Navy,
    gray: Colors.Gray,
    silver: Colors.Silver,
    white: Colors.White,
    black: Colors.Black,
    transparent: Colors.Transparent,
  },
  breakpoints: {
    desktop: customMediaQuery(1200),
    tablet: customMediaQuery(900),
    phone: customMediaQuery(600),
  },
  button: {
    size: {
      small: {
        fontSize: rem(0.85),
        lineHeigth: rem(1),
        padding: [rem(0.25), rem(0.75)],
      },
      medium: {
        fontSize: rem(1),
        lineHeigth: rem(1.5),
        padding: [rem(0.375), rem(1)],
      },
      large: {
        fontSize: rem(1.2),
        lineHeigth: rem(1.7),
        padding: [rem(0.45), rem(1.25)],
      },
    },
    color: {
      blue: {
        background: Colors.Blue,
        font: Colors.White,
      },
      pink: { background: Colors.Pink, font: Colors.White },
      gray: { background: Colors.Gray, font: Colors.White },
      silver: { background: Colors.Silver, font: Colors.Navy },
      white: { background: Colors.White, font: Colors.Navy },
    },
  },
  font: {
    weight: {
      300: '300',
      400: '300',
      500: '500',
    },
  },
  radius: {
    primary: rem(0.5),
    circle: '50%',
  },
  loader: {
    size: {
      small: rem(1),
      medium: rem(1.2),
      large: rem(1.7),
    },
    colors: {
      white: Colors.White,
      navy: Colors.Navy,
      gray: Colors.Gray,
    },
  },
};
