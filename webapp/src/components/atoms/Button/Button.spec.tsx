import type { ButtonColors } from 'components/atoms/Button';
import { Button, Size } from 'components/atoms/Button';
import { render } from 'utils/test-utils';

describe('Atoms/Button tests', () => {
  it('renders properly', () => {
    const { getByText } = render(<Button>test button</Button>);

    expect(getByText('test button')).toBeInTheDocument();
  });

  it.each([
    ['primary' as ButtonColors, { background: '#3F8CFF', font: '#ffffff' }],
    ['secondary' as ButtonColors, { background: '#333333', font: '#ffffff' }],
  ])('has correct color for %s', (color, { background, font }) => {
    const { getByText } = render(<Button color={color}>test button</Button>);

    expect(getByText('test button')).toHaveStyleRule('background-color', background);
    expect(getByText('test button')).toHaveStyleRule('color', font);
  });

  it.each([
    ['small' as Size, '0.25rem 0.75rem'],
    ['medium' as Size, '0.5rem 1.25rem'],
    ['large' as Size, '0.75rem 1.5rem'],
  ])('has correct padding for %s', (padding, expected) => {
    const { getByText } = render(<Button size={padding}>test button</Button>);

    expect(getByText('test button')).toHaveStyleRule('padding', expected);
  });
});
