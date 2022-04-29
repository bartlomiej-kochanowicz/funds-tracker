import { render } from 'utils/test-utils';
import { Loader, Size } from 'components/atoms/Loader';

describe('Loader tests', () => {
  it.each([
    ['small' as Size, '0.25rem 0.75rem'],
    ['medium' as Size, '0.375rem 1rem'],
    ['large' as Size, '0.45rem 1.25rem'],
  ])('has correct padding for %s', (size, expected) => {
    const { getByText } = render(<Loader size={size} />);

    expect(getByText('test button')).toHaveStyleRule('padding', expected);
  });
});
