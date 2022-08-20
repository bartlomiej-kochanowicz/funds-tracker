import { documentHeight } from 'helpers/documentHeight';
import 'react-toastify/dist/ReactToastify.css';
import 'utils/i18n';

window.addEventListener('resize', documentHeight);

documentHeight();
