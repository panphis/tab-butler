import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from "i18next-http-backend";
import { languages } from "../../../utils/constant";


i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    preload: languages,
    supportedLngs: languages,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: languages?.[0] || 'zh-CN',
    detection: {
      order: ['localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    backend: {
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
