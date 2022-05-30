import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { IS_DEVELOPMENT } from 'config/env';
// import Backend from 'i18next-fs-backend'; <-- not working for now - vite problem

import en from 'locales/en.json';

i18next
  // .use(Backend) <-- not working for now - vite problem
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: IS_DEVELOPMENT,
    resources: {
      en: { translation: en },
    },
  });
