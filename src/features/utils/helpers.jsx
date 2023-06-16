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

export { triggerClickOutside, triggerClickNext, triggerClickPrev };
