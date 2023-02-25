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
        fontWeight="500"
        fontColor="blue"
        fontSize="2.5"
        lineHeight="1.5rem"
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

describe('Atoms/Text marginMixin tests', () => {
  it('renders properly with custom same margin every side', () => {
    const { getByText } = render(<Text m={1}>Hello World</Text>);

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('margin', '0.25rem');
  });

  it('renders properly with custom same margin top and bottom side', () => {
    const { getByText } = render(<Text my={1}>Hello World</Text>);

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('margin-top', '0.25rem');
    expect(text).toHaveStyleRule('margin-right', undefined);
    expect(text).toHaveStyleRule('margin-bottom', '0.25rem');
    expect(text).toHaveStyleRule('margin-left', undefined);
  });

  it('renders properly with custom same margin left and right side', () => {
    const { getByText } = render(<Text mx={1}>Hello World</Text>);

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('margin-top', undefined);
    expect(text).toHaveStyleRule('margin-right', '0.25rem');
    expect(text).toHaveStyleRule('margin-bottom', undefined);
    expect(text).toHaveStyleRule('margin-left', '0.25rem');
  });

  it('renders properly with custom different margin every side', () => {
    const { getByText } = render(
      <Text
        mt={1}
        mr={2}
        mb={3}
        ml={4}
      >
        Hello World
      </Text>,
    );

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('margin-top', '0.25rem');
    expect(text).toHaveStyleRule('margin-right', '0.5rem');
    expect(text).toHaveStyleRule('margin-bottom', '0.75rem');
    expect(text).toHaveStyleRule('margin-left', '1rem');
  });
});

describe('Atoms/Text paddingMixin tests', () => {
  it('renders properly with custom same padding every side', () => {
    const { getByText } = render(<Text p={1}>Hello World</Text>);

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('padding', '0.25rem');
  });

  it('renders properly with custom same padding top and bottom side', () => {
    const { getByText } = render(<Text py={1}>Hello World</Text>);

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('padding-top', '0.25rem');
    expect(text).toHaveStyleRule('padding-right', undefined);
    expect(text).toHaveStyleRule('padding-bottom', '0.25rem');
    expect(text).toHaveStyleRule('padding-left', undefined);
  });

  it('renders properly with custom same padding left and right side', () => {
    const { getByText } = render(<Text px={1}>Hello World</Text>);

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('padding-top', undefined);
    expect(text).toHaveStyleRule('padding-right', '0.25rem');
    expect(text).toHaveStyleRule('padding-bottom', undefined);
    expect(text).toHaveStyleRule('padding-left', '0.25rem');
  });

  it('renders properly with custom different padding every side', () => {
    const { getByText } = render(
      <Text
        pt={1}
        pr={2}
        pb={3}
        pl={4}
      >
        Hello World
      </Text>,
    );

    const text = getByText('Hello World');

    expect(text).toHaveStyleRule('padding-top', '0.25rem');
    expect(text).toHaveStyleRule('padding-right', '0.5rem');
    expect(text).toHaveStyleRule('padding-bottom', '0.75rem');
    expect(text).toHaveStyleRule('padding-left', '1rem');
  });
});
