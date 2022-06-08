import { render } from 'utils/test-utils';
import { Loader, Size, LoaderColors } from 'components/atoms/Loader';

describe.skip('Atoms/Loader tests', () => {
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
    ['gray' as LoaderColors, '3px solid hsla(226,8%,69%,1)'],
    ['white' as LoaderColors, '3px solid hsla(0,0%,100%,1)'],
    ['navy' as LoaderColors, '3px solid hsla(234,51%,17%,1)'],
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
