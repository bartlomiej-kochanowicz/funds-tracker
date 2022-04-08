import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Root } from 'Views/Root';

const App: FC = (): JSX.Element => (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

export default App;
