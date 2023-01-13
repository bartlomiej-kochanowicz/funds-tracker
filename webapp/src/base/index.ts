import LogRocket from 'logrocket';
import { documentHeight } from 'helpers/documentHeight';
import { IS_DEVELOPMENT, LOG_ROCKET_KEY } from 'config/env';
import 'react-toastify/dist/ReactToastify.css';
import 'utils/i18n';

window.addEventListener('resize', documentHeight);

documentHeight();

if (!IS_DEVELOPMENT) {
  LogRocket.init(LOG_ROCKET_KEY);
}
