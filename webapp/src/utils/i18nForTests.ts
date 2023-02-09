import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'locales/en-US.json';

i18next.use(initReactI18next).init({
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
  load: 'languageOnly',
  resources: { 'en-US': { translation: en } },
});

export default i18next;
