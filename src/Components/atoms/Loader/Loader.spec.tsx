import { render } from 'utils/test-utils';
import { Loader, Size } from 'components/atoms/Loader';

describe('Loader tests', () => {
  it.each([
    ['small' as Size, '1rem'],
    ['medium' as Size, '1.2rem'],
    ['large' as Size, '1.7rem'],
  ])('has correct size for %s', (size, expected) => {
    const { getByTestId } = render(
      <Loader
        size={size}
        data-testid="test-loader"
      />,
    );

    expect(getByTestId('test-loader')).toHaveStyleRule('width', expected);
    expect(getByTestId('test-loader')).toHaveStyleRule('height', expected);
  });
});
