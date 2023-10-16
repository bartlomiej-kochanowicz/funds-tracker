import { Text } from 'components/atoms/Text';
import { render } from 'utils/test-utils';

describe('Atoms/Text tests', () => {
  it('renders properly', () => {
    const { getByText } = render(<Text>Hello World</Text>);

    expect(getByText('Hello World')).toBeInTheDocument();
  });
});

describe('Atoms/Text fontable tests', () => {
  it('renders properly with custom font property', () => {
    const { getByText } = render(
      <Text
        $fontWeight="500"
        $fontColor="blue"
        $fontSize="2.5"
        $lineHeight="1.5rem"
      >
        Hello World
      </Text>,
    );

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('color', '#3F8CFF');
    expect(text).toHaveStyleRule('font-weight', '500');
    expect(text).toHaveStyleRule('font-size', '2.5rem');
    expect(text).toHaveStyleRule('line-height', '1.5rem');
  });
});
