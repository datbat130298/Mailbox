import Cookies from 'universal-cookie';

const set = (key, value) => {
  const cookiesStore = new Cookies();

  cookiesStore.set(key, value, {
    path: '/',
    domain: process.env.REACT_APP_SUB_DOMAIN,
  });
};

const get = (key, defaultValue = null) => {
  const cookiesStore = new Cookies();

  return cookiesStore.get(key) || defaultValue;
};

const remove = (key) => {
  const cookiesStore = new Cookies();

  cookiesStore.remove(key, {
    path: '/',
    domain: process.env.REACT_APP_SUB_DOMAIN,
  });
};

export { get, remove, set };
