import { documentHeight } from 'helpers/documentHeight';
import { worker } from 'mocks/browser';
import 'react-toastify/dist/ReactToastify.css';
import 'utils/i18n';

window.addEventListener('resize', documentHeight);

documentHeight();

worker.start({ onUnhandledRequest: 'bypass' });
