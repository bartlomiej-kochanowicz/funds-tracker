import { Spread, Spreader } from 'components/atoms/Spreader';
import { render } from 'utils/test-utils';

describe('Atoms/Spreader tests', () => {
  it('renders properly', () => {
    const { getByTestId } = render(<Spreader data-testid="spreader" />);

    expect(getByTestId('spreader')).toBeInTheDocument();
  });

  it.each([
    ['0.1' as Spread, '0 0.1rem'],
    ['0.25' as Spread, '0 0.25rem'],
    ['0.5' as Spread, '0 0.5rem'],
    ['1' as Spread, '0 1rem'],
    ['3.5' as Spread, '0 3.5rem'],
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
