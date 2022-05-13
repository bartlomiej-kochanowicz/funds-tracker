import { render } from 'utils/test-utils';
import { Button, Size, ButtonColors } from 'components/atoms/Button';

describe('Atoms/Button tests', () => {
  it('renders properly', () => {
    const { getByText } = render(<Button>test button</Button>);

    expect(getByText('test button')).toBeInTheDocument();
  });

  it.each([
    ['blue' as ButtonColors, { background: 'hsla(230,62%,50%,1)', font: 'hsla(0,0%,100%,1)' }],
    ['pink' as ButtonColors, { background: 'hsla(5,100%,75%,1)', font: 'hsla(0,0%,100%,1)' }],
    ['gray' as ButtonColors, { background: 'hsla(226,8%,69%,1)', font: 'hsla(0,0%,100%,1)' }],
    ['silver' as ButtonColors, { background: 'hsla(0,0%,96%,1)', font: 'hsla(234,51%,17%,1)' }],
    ['white' as ButtonColors, { background: 'hsla(0,0%,100%,1)', font: 'hsla(234,51%,17%,1)' }],
  ])('has correct color for %s', (color, { background, font }) => {
    const { getByText } = render(<Button color={color}>test button</Button>);

    expect(getByText('test button')).toHaveStyleRule('background-color', background);
    expect(getByText('test button')).toHaveStyleRule('color', font);
  });

  it.each([
    ['small' as Size, '0.25rem 0.75rem'],
    ['medium' as Size, '0.375rem 1rem'],
    ['large' as Size, '0.45rem 1.25rem'],
  ])('has correct padding for %s', (padding, expected) => {
    const { getByText } = render(<Button size={padding}>test button</Button>);

    expect(getByText('test button')).toHaveStyleRule('padding', expected);
  });
});
