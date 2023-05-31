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

export { triggerClickOutside };
