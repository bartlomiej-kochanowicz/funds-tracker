import Cookies from 'js-cookie';
import { HAS_ACCESS_TO_APPLICATION } from 'config/env';

export const hasAccess = Cookies.get(HAS_ACCESS_TO_APPLICATION) === 'true';
