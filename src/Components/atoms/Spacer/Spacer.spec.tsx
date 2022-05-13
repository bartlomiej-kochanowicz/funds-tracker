import { render } from 'utils/test-utils';
import { Spacer, Space } from 'components/atoms/Spacer';

describe('Atoms/Spacer tests', () => {
  it('renders properly', () => {
    const { getByTestId } = render(<Spacer data-testid="spacer" />);

    expect(getByTestId('spacer')).toBeInTheDocument();
  });

  it.each([
    ['small' as Space, '0.5rem 0'],
    ['medium' as Space, '1rem 0'],
    ['large' as Space, '1.5rem 0'],
  ])('has correct size for %s', (space, padding) => {
    const { getByTestId } = render(
      <Spacer
        data-testid="spacer"
        space={space}
      />,
    );

    expect(getByTestId('spacer')).toHaveStyleRule('padding', padding);
  });
});
