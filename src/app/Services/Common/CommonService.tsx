import _ from 'lodash';
import Cookies from 'universal-cookie';

import { TableColumnFiltersState } from '../../Types/commonTypes';

interface ParamTypes {
  [key: string]: string | number | Array<unknown> | undefined;
}

const generateFilterString = (filterParams?: TableColumnFiltersState) => {
  return filterParams
    ?.map((filterParam) => {
      return `filter[${filterParam.filterBy}]=${filterParam.values
        .filter((value) => value !== 'null')
        .join(',')}`;
    })
    .join('&');
};

const generateSearchParams = (params: ParamTypes) => {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (!value) {
      return;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      searchParams.append(key, String(params[String(key)]));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, item);
      });
    }
  });
  return searchParams;
};

const generateParamString = (params: ParamTypes, filterParams?: TableColumnFiltersState) => {
  const filterString = generateFilterString(filterParams);
  const searchParamsString = generateSearchParams(params).toString();
  if (filterParams) {
    return `${searchParamsString}&${filterString}`;
  }

  return searchParamsString;
};

const getQueryURL = (url: string, params: ParamTypes, filterParams?: TableColumnFiltersState) => {
  const paramString = generateParamString(params, filterParams);
  return `${url}?${paramString}`;
};

export { generateSearchParams, generateParamString, getQueryURL };
