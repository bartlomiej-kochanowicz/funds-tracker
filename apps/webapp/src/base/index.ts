import "utils/i18n";

import { IS_DEVELOPMENT, LOG_ROCKET_KEY } from "config/env";
import LogRocket from "logrocket";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

if (!IS_DEVELOPMENT) {
	LogRocket.init(LOG_ROCKET_KEY);
}
