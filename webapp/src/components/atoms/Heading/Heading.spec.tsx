import { render } from 'utils/test-utils';
import { Heading } from 'components/atoms/Heading';

describe('Atoms/Heading tests', () => {
  it('renders properly', () => {
    const { getByText } = render(<Heading>Hello World</Heading>);

    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders properly with inline property', () => {
    const { getByText } = render(<Heading inline>Hello World</Heading>);

    expect(getByText('Hello World')).toHaveStyleRule('display', 'inline-block');
  });
});
