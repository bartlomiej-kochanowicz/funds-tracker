import { render } from 'utils/test-utils';
import { GlobalStyle } from 'styles/GlobalStyle';

describe('Styles/GlobalStyle tests', () => {
  it('renders properly', () => {
    render(<GlobalStyle modalVisible />);
  });
});
