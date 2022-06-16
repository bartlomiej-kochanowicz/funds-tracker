import { render } from 'utils/test-utils';
import { Spreader, Spread } from 'components/atoms/Spreader';

describe('Atoms/Spreader tests', () => {
  it('renders properly', () => {
    const { getByTestId } = render(<Spreader data-testid="spreader" />);

    expect(getByTestId('spreader')).toBeInTheDocument();
  });

  it.each([
    ['small' as Spread, '0 0.5rem'],
    ['medium' as Spread, '0 1rem'],
    ['large' as Spread, '0 1.5rem'],
  ])('has correct size for %s', (spread, padding) => {
    const { getByTestId } = render(
      <Spreader
        data-testid="spreader"
        spread={spread}
      />,
    );

    expect(getByTestId('spreader')).toHaveStyleRule('padding', padding);
  });
});
