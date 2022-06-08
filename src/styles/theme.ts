import { customMediaQuery } from 'helpers/customMediaQuery';
import { rem } from 'helpers/units';
import { breakpoints } from 'constants/breakpoints';

export const Colors = {
  Green: '#7DCAC7',
  Blue: '#3F8CFF',
  Black: '#111111',
  White: '#ffffff',
  Purple: '#725BFE',
  DarkGray: '#7C8DA6',
  Gray: '#A5B4CB',
  LightGray: '#F5F7F9',
  Light: '#FAFBFC',
  LightYellow: '#FAF9F4',
};

export const theme = {
  colors: {
    green: Colors.Green,
    blue: Colors.Blue,
    black: Colors.Black,
    white: Colors.White,
    purple: Colors.Purple,
    darkGray: Colors.DarkGray,
    gray: Colors.Gray,
    lightGray: Colors.LightGray,
    light: Colors.Light,
    lightYellow: Colors.LightYellow,
  },
  breakpoints: {
    desktop: customMediaQuery(breakpoints.desktop),
    tablet: customMediaQuery(breakpoints.tablet),
    phone: customMediaQuery(breakpoints.phone),
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
      black: { background: Colors.Black, font: Colors.White },
    },
  },
  font: {
    weight: {
      300: '300',
      400: '300',
      500: '500',
      700: '700',
    },
    size: {
      small: rem(0.75),
      medium: rem(1),
      large: rem(1.25),
      huge: rem(4),
    },
  },
  radius: {
    primary: rem(6.25),
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
      gray: Colors.Gray,
    },
  },
  spacing: {
    small: rem(1 / 2), // devide by 2 - top and bottom or right and left(both sides) - 1rem
    medium: rem(2 / 2), // devide by 2 - top and bottom or right and left(both sides) - 2rem
    large: rem(3 / 2), // devide by 2 - top and bottom or right and left(both sides) - 3rem
  },
  heading: {
    h1: { fontSize: rem(2.5) },
    h2: { fontSize: rem(1.5) },
    h3: { fontSize: rem(1.25) },
    h4: { fontSize: rem(1.25) },
    h5: {
      fontSize: rem(1.25),
    },
    h6: {
      fontSize: rem(1.25),
    },
  },
};
