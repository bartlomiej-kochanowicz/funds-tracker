import { render } from 'utils/test-utils';
import { Loader, Size, LoaderColors } from 'components/atoms/Loader';

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

  it.each([
    ['blue' as LoaderColors, '1rem'],
    ['white' as LoaderColors, '1.2rem'],
    ['navy' as LoaderColors, '1.7rem'],
  ])('has correct color for %s', (color, expected) => {
    const { getByTestId } = render(
      <Loader
        color={color}
        data-testid="test-loader"
      />,
    );

    expect(getByTestId('test-loader')).toHaveStyleRule('width', expected);
    expect(getByTestId('test-loader')).toHaveStyleRule('height', expected);
  });
});
