import { customMediaQuery } from 'helpers/customMediaQuery';
import { rem } from 'helpers/units';

export const theme = {
  colors: {
    // blue
    blueBase: 'hsla(230, 62%, 50%, 1)',
    // pink
    pinkBase: 'hsla(5, 100%, 75%, 1)',
    // black
    blackBase: 'hsla(234, 51%, 17%, 1)',
    // gray
    grayBase: 'hsla(226, 8%, 69%, 1)',
    // silver
    silverBase: 'hsla(0, 0%, 96%, 1)',
    // white
    white: 'hsl(0, 0%, 100%, 1)',
    // black
    black: 'hsl(0, 0%, 0%, 1)',
  },
  breakpoints: {
    desktop: customMediaQuery(1200),
    tablet: customMediaQuery(900),
    phone: customMediaQuery(600),
  },
  buttonSizes: {
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
};
