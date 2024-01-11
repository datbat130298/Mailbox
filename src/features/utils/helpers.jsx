import _ from 'lodash';

const triggerClickOutside = (ref, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  document.addEventListener('click', handleClickOutside, true);

  return () => {
    document.removeEventListener('click', handleClickOutside, true);
  };
};

const triggerClickNext = (data, currentTarget) => {
  const currentIndex = data.findIndex((item) => item.uuid === currentTarget.uuid);
  if (!_.isEmpty(data[currentIndex + 1])) return data[currentIndex + 1];
  return false;
};

const triggerClickPrev = (data, currentTarget) => {
  const currentIndex = data.findIndex((item) => item.uuid === currentTarget.uuid);
  if (!_.isEmpty(data[currentIndex - 1])) return data[currentIndex - 1];
  return false;
};

const convertHtmlToString = (html) => {
  const tempDivElement = document.createElement('div');
  tempDivElement.innerHTML = html;
  return tempDivElement.textContent || tempDivElement.innerText || '';
};

const joinURL = (...args) => {
  return args.join('/').replace(/([^:]\/)\/+/g, '$1');
};

const queryParamsDefault = {
  searchValue: '',
  searchBy: [],
  filterParams: [],
  filterBy: '',
  filterValue: '',
  filterByDate: '',
  filterByRelative: '',
  filterValueRelative: '',
  sort: '',
  page: 1,
  perPage: 20,
  customId: null,
  type: '',
  searchTerm: '',
};

export {
  convertHtmlToString,
  joinURL,
  queryParamsDefault,
  triggerClickNext,
  triggerClickOutside,
  triggerClickPrev,
};
