import { documentHeight } from 'helpers/documentHeight';
import 'utils/i18next';

window.addEventListener('resize', documentHeight);

documentHeight();
