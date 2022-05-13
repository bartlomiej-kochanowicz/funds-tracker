import { render } from 'utils/test-utils';
import { Spacer } from 'components/atoms/Spacer';

describe('Atoms/Spacer tests', () => {
  it('renders properly', () => {
    const { getByTestId } = render(<Spacer data-testid="spacer" />);

    expect(getByTestId('spacer')).toBeInTheDocument();
  });
});
