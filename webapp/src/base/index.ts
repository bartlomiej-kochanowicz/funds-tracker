import 'react-toastify/dist/ReactToastify.css';
import 'utils/i18n';

import { IS_DEVELOPMENT, LOG_ROCKET_KEY } from 'config/env';
import { documentHeight } from 'helpers/documentHeight';
import LogRocket from 'logrocket';

window.addEventListener('resize', documentHeight);

documentHeight();

if (!IS_DEVELOPMENT) {
  LogRocket.init(LOG_ROCKET_KEY);
}
