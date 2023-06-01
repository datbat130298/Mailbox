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

const triggerClickNext = (data, currentTarget, setNextItem) => {
  const currentIndex = data.findIndex((item) => item.uuid === currentTarget.uuid);
  if (!_.isEmpty(data[currentIndex + 1])) return setNextItem(data[currentIndex + 1]);
  return false;
};

const triggerClickPrev = (data, currentTarget, setPrevItem) => {
  const currentIndex = data.findIndex((item) => item.uuid === currentTarget.uuid);
  if (!_.isEmpty(data[currentIndex - 1])) return setPrevItem(data[currentIndex - 1]);
  return false;
};

export { triggerClickOutside, triggerClickNext, triggerClickPrev };
