/**
 * Local Storage.
 */

const set = (key, value) => {
  window.localStorage.setItem(key, value);
};

const get = (key) => {
  return window.localStorage.getItem(key);
};

const remove = (key) => {
  window.localStorage.removeItem(key);
};

export { get, remove, set };
