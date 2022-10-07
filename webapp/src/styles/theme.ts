import { customMediaQuery } from 'helpers/customMediaQuery';
import { rem } from 'helpers/units';
import { breakpoints } from 'constants/breakpoints';
import { transparentize } from 'color2k';

export const Colors = {
  Green: '#7DCAC7',
  Blue: '#3F8CFF',
  Red: '#e74c3c',
  Black: '#333333',
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
    red: Colors.Red,
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
        fontSize: rem(0.75),
        lineHeigth: rem(1.25),
      },
      medium: {
        fontSize: rem(1),
        lineHeigth: rem(1.5),
      },
      large: {
        fontSize: rem(1.25),
        lineHeigth: rem(1.5),
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
  padding: {
    small: `${rem(0.25)} ${rem(0.75)}`,
    smallX: `0 ${rem(0.75)}`,
    smallY: `${rem(0.25)} 0`,
    medium: `${rem(0.5)} ${rem(1.25)}`,
    mediumX: `0 ${rem(1.25)}`,
    mediumY: `${rem(0.5)} 0`,
    large: `${rem(0.75)} ${rem(1.5)}`,
    largeX: `0 ${rem(1.5)}`,
    largeY: `${rem(0.75)} 0`,
    huge: `${rem(1.75)} ${rem(3.5)}`,
    hugeX: `0 ${rem(3.5)}`,
    hugeY: `${rem(1.75)} 0`,
  },
  font: {
    weight: {
      '400': '400',
      '500': '500',
      '700': '700',
    },
    size: {
      '0.75': rem(0.75),
      '0.875': rem(0.875),
      '1': rem(1),
      '1.25': rem(1.25),
      '1.5': rem(1.5),
      '2.5': rem(2.5),
    },
  },
  radius: {
    primary: rem(6.25),
    secondary: rem(0.4),
    tertiary: rem(1.25),
  },
  loader: {
    size: {
      small: rem(1),
      medium: rem(1.5),
      large: rem(2),
    },
    colors: {
      white: Colors.White,
      black: Colors.Black,
      blue: Colors.Blue,
    },
  },
  spacing: {
    tiny: rem(0.25),
    small: rem(0.5),
    medium: rem(1),
    large: rem(1.5),
    huge: rem(3.5),
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
  shadows: {
    dropdown: `0 10px 15px -3px ${transparentize(Colors.Black, 0.9)},
    0 4px 6px -4px ${transparentize(Colors.Black, 0.9)}`,
    box: `0 0 10px 0 ${transparentize(Colors.Black, 0.9)}`,
  },
  gradients: {
    primary: `linear-gradient(to top left, #B0B0B0, #FAFBFC);`,
    secondary: `linear-gradient(to top, #2a2a2a , #333333)`,
    tertiary: `radial-gradient(circle at right bottom, #AFE39D , #7DCAC7)`,
  },
  zIndex: {
    sidebar: 1,
    bottomBar: 1,
    topbar: 2,
  },
};
