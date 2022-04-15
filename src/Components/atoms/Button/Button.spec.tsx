import { render } from 'utils/test-utils';
import { Button } from 'components/atoms/Button';

describe('Button tests', () => {
  it('renders properly', () => {
    const { getByText } = render(<Button>test button</Button>);

    expect(getByText('test button')).toBeInTheDocument();
  });
});
