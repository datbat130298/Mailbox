import _ from 'lodash';
import Cookies from 'universal-cookie';
import axiosInstance from '../../../features/utils/Http/axios';
import { generateParamString } from '../Common/CommonService';

interface LanguageType {
  lang: string;
  langs?: string;
}

const getFlagURLPattern = () => {
  const FLAG_URL_PATTERN = 'https://purecatamphetamine.github.io/country-flag-icons/3x2/:code.svg';
  return FLAG_URL_PATTERN;
};

const getFlagURL = (code: string) => {
  const FLAG_URL_PATTERN = getFlagURLPattern();
  return FLAG_URL_PATTERN.replace(':code', code);
};

const getActiveLanguageList = async () => {
  const response = await axiosInstance.get('api/languages', {
    params: {
      'filter[status]': true,
    },
  });

  return response.data;
};

const setLanguagesPage = ({ lang, langs }: LanguageType) => {
  const paramString = generateParamString({
    lang: [lang],
    langs: [langs],
  });
  return axiosInstance.get(`api/support-multiple-languages?${paramString}`);
};

const getLanguagesPage = () => {
  const cookie = new Cookies();
  const language = cookie.get('lang');
  return _.isUndefined(language) ? 'en' : language;
};

export { getFlagURL, getFlagURLPattern, getActiveLanguageList, setLanguagesPage, getLanguagesPage };
