import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frNavbar from './locales/fr/navbar.json';
import itNavbar from './locales/it/navbar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { navbar: frNavbar },
      it: { navbar: itNavbar }
    },
    fallbackLng: 'fr',
    ns: ['navbar'],
    defaultNS: 'navbar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
