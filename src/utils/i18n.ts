import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-fs-backend'; <-- not working for now

import en from 'locales/en.json';

i18next
  // .use(Backend) <-- not working for now
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
    resources: {
      en: { translation: en },
    },
  });
