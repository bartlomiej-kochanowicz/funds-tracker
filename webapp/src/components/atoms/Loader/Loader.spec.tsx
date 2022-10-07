import { render } from 'utils/test-utils';
import { Loader, Size, LoaderColors } from 'components/atoms/Loader';

describe('Atoms/Loader tests', () => {
  it.each([
    ['small' as Size, '1rem'],
    ['medium' as Size, '1.5rem'],
    ['large' as Size, '2rem'],
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
    ['white' as LoaderColors, '3px solid #ffffff'],
    ['black' as LoaderColors, '3px solid #333333'],
    ['blue' as LoaderColors, '3px solid #3F8CFF'],
  ])('has correct color for %s', (color, expected) => {
    const { getByTestId } = render(
      <Loader
        color={color}
        data-testid="test-loader"
      />,
    );

    expect(getByTestId('test-loader')).toHaveStyleRule('border', expected);
  });
});
