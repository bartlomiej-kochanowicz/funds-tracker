import { documentHeight } from 'helpers/documentHeight';
import 'utils/i18n';

window.addEventListener('resize', documentHeight);

documentHeight();
