import { render } from '@testing-library/react';
import { Button } from 'components/atoms/Button';

describe('Button tests', () => {
  it('renders properly', () => {
    const { getByText } = render(<Button>test button</Button>);

    expect(getByText('test button')).toBeInTheDocument();
  });
});
