import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { IS_DEVELOPMENT } from 'config/env';
import Backend from 'i18next-http-backend';

const loadPath = IS_DEVELOPMENT ? 'src/locales/{{lng}}.json' : '/locales/{{lng}}.json';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
    debug: IS_DEVELOPMENT,
    load: 'languageOnly',
  });
