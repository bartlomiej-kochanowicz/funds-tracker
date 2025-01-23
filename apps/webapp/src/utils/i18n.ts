import { IS_DEVELOPMENT } from "config/env";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18next
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		backend: {
			loadPath: "/public/locales/{{lng}}.json",
		},
		fallbackLng: "en-US",
		interpolation: {
			escapeValue: false,
		},
		debug: IS_DEVELOPMENT,
		load: "currentOnly",
	});

export default i18next;
