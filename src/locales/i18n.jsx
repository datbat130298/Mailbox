import i18n from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import UniversalCookie from 'universal-cookie';
// TODO: Uncomment this when you complete the translation refactoring tasks.
// import { getLanguageByCode } from "../app/Services/LanguageService";
import enTranslation from './en.json';
import viTranslation from './vi.json';

const cookies = new UniversalCookie();

// TODO: Remove this when you complete the translation refactoring tasks.
// This is a temporary solution to prevent the `i18next-http-backend` from loading multiple times.
const translation = {
  en: enTranslation,
  vi: viTranslation,
};

const backendOptions = {
  allowMultiLoading: false,
  loadPath: '{{lng}}',
  request: (_options, url, _payload, callback) => {
    // TODO: Uncomment this when you complete the translation refactoring tasks.
    // getLanguageByCode(url).then((data) => {
    //   callback(null, {
    //     status: 200,
    //     data: data.fe,
    //   });
    // });

    // TODO: Remove this when you complete the translation refactoring tasks.
    callback(null, {
      status: 200,
      data: translation[url],
    });
  },
};

i18n
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    backend: backendOptions,
    fallbackLng: 'en',
    debug: false,
    lng: cookies.get('lang') || 'en',
  });

export default i18n;
