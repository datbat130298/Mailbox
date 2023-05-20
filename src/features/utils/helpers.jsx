import _, { get } from "lodash";
import { matchPath } from "react-router-dom";

const formatCurrency = (value, currency = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(value);
};

/**
 * Normalize card number from input to 16 digits
 * @param {String} cardNumber
 * @returns {String}
 */
const normalizeCardNumber = (cardNumber) => {
  const cardNumberString = cardNumber.toString();
  const cardNumberStringWithoutSpace = cardNumberString.replace(/\s/g, "");
  const cardNumberStringWithoutSpaceAndDash = cardNumberStringWithoutSpace.replace(/-/g, "");
  const cardNumberStringWithoutSpaceAndDashAndSlash = cardNumberStringWithoutSpaceAndDash.replace(/\//g, "");

  return cardNumberStringWithoutSpaceAndDashAndSlash;
};

/**
 * Beautify card number from 16 digits to 4 digits per group
 * @param {String} cardNumber
 * @returns {String}
 */
const beautifyCardNumber = (cardNumber) => {
  const cardNumberString = cardNumber.toString();
  const cardNumberStringWithoutSpace = cardNumberString.replace(/\s/g, "");
  const cardNumberStringWithoutSpaceAndDash = cardNumberStringWithoutSpace.replace(/-/g, "");
  const cardNumberStringWithoutSpaceAndDashAndSlash = cardNumberStringWithoutSpaceAndDash.replace(/\//g, "");

  const cardNumberArray = cardNumberStringWithoutSpaceAndDashAndSlash.split("");

  const cardNumberArrayWithSpace = cardNumberArray.slice(0, 16).map((value, index) => {
    if (index % 4 === 0 && index !== 0) {
      return ` ${value}`;
    }
    return value;
  });

  return cardNumberArrayWithSpace.join("");
};

/**
 * Normalize month to 2 digits
 * @param {String} month
 * @returns {String}
 */
const normalizeMonth = (month) => {
  if (!month) return "";

  const monthNumber = parseInt(month, 10);

  if (!monthNumber) return "";

  if (monthNumber > 12) return "12";

  if (monthNumber < 10) {
    return `0${monthNumber}`;
  }

  return String(monthNumber);
};

/**
 * Normalize year to last 2 digits
 * @param {String} year
 * @returns {String}
 */
const normalizeYear = (year) => {
  if (!year) return "";

  const yearString = year.toString();

  if (yearString.length === 2) {
    return yearString;
  }

  return yearString.slice(-2);
};

/**
 * Get expiration month and year from input (like 12/21)
 * @param {*} expires
 */
const getExpirationMonthAndYear = (expires) => {
  const expiresString = expires.toString();
  const expiresArray = expiresString.split("/");

  return {
    month: normalizeMonth(expiresArray[0]),
    year: normalizeYear(expiresArray[1]),
  };
};

const generateImageUrlFromFile = (imageFile) => {
  if (imageFile instanceof File) {
    return URL.createObjectURL(imageFile);
  }
  return imageFile;
};
const clearLayout = () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");

  if (header) header.classList.add("!hidden");
  if (footer) footer.classList.add("hidden");
  if (sidebar) sidebar.classList.add("hidden");
  if (content) {
    content.className = "w-full min-h-fit-layout";
  }
  return () => {
    if (header) header.classList.remove("!hidden");
    if (footer) footer.classList.remove("hidden");
    if (sidebar) sidebar.classList.remove("hidden");
    if (content) {
      content.className = "ml-72 min-h-fit-layout w-fit-layout";
    }
  };
};

const triggerClickOutside = (ref, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  document.addEventListener("click", handleClickOutside, true);

  return () => {
    document.removeEventListener("click", handleClickOutside, true);
  };
};

const checkShowSMTPAccount = (isCanAddSMTPAccount, isAvailableSMTPAccount) => {
  // Nếu isCanAddSMTPAccount === true và isAvailableSMTPAccount === true thì hiện ra
  // Nếu isCanAddSMTPAccount === true và isAvailableSMTPAccount === false thì hiện ra
  // Nếu isCanAddSMTPAccount === false và isAvailableSMTPAccount === false thì hiện ra
  // Nếu isCanAddSMTPAccount === false và isAvailableSMTPAccount === true thì ẩn
  if (isCanAddSMTPAccount && isAvailableSMTPAccount) return true;
  if (isCanAddSMTPAccount && !isAvailableSMTPAccount) return true;
  if (!isCanAddSMTPAccount && !isAvailableSMTPAccount) return true;
  return false;
};

const checkValidateEmail = (email) => {
  if (!email) return true;
  const regexMail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  if (!regexMail.test(email)) return false;
  return true;
};

const checkValidateSlug = (slug) => {
  if (!slug) return true;
  const regexMail = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!regexMail.test(slug)) return false;
  return true;
};

const queryParamsDefault = {
  searchValue: "",
  searchBy: [],
  filterParams: [],
  filterBy: "",
  filterValue: "",
  filterByDate: "",
  filterByRelative: "",
  filterValueRelative: "",
  sort: "",
  page: 1,
  perPage: 10,
  customId: null,
};

const queryParamsDefaultForGridLayout = {
  ...queryParamsDefault,
  perPage: 9,
};

const generateFilterParams = (columnFilters, searchValue, typeSearch) => {
  const newFilterStates = [...columnFilters];
  const filterState = newFilterStates.find((filter) => filter.filterBy === typeSearch);
  if (!filterState && !_.isEmpty(searchValue)) {
    newFilterStates.push({ filterBy: typeSearch, filterValue: searchValue });
    return newFilterStates;
  }
  if (filterState) {
    filterState.filterValue = searchValue;
    return newFilterStates;
  }
  return newFilterStates;
};

const gernerateBackgroundColor = () => {
  const arrayColor = ["bg-blue-400", "bg-red-400", "bg-orange-400", "bg-green-400", "bg-gray-400"];
  const pickColor = _.random(0, 4);
  return arrayColor[pickColor];
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const checkPermission = (requiredPermission, userPermission) => {
  const permissionPriority = {
    stater: 1,
    professional: 2,
    business: 3,
    enterprise: 4,
  };

  const requiredPermissionPriority = permissionPriority[requiredPermission];
  const userPermissionPriority = permissionPriority[userPermission];

  if (userPermissionPriority >= requiredPermissionPriority) {
    return true;
  }

  return false;
};

const getFeatureName = (name, languageCode, config) => {
  if (!name?.includes("{{")) return get(name, languageCode, name);

  Object.keys(config).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    name = name.replace(`{{${key}}}`, config[key]);
  });

  return name;
};

const getOptionBreadcrumb = (root, location) => {
  return location
    .split("/")
    .filter(Boolean)
    .reduce(
      (acc, curr, idx, arr) => {
        acc.path += `/${curr}`;
        acc.crumbs.push({
          path: acc.path,
          name: decodeURIComponent(curr),
        });

        if (idx === arr.length - 1) return acc.crumbs;
        return acc;
      },
      { path: "", crumbs: [{ path: "/", name: root }] }
    );
};

const startOrCloseThemeDark = (isShow = false) => {
  const root = document.getElementById("change_theme");
  const dropdown = document.getElementById("dropdown-provider");
  if (isShow) {
    root.classList.add("dark");
    dropdown.classList.add("dark");
  } else {
    root.classList.remove("dark");
    dropdown.classList.remove("dark");
  }

  return () => {
    if (root) root.classList.remove("dark");
    if (dropdown) dropdown.classList.remove("dark");
  };
};

const excludeSidebarPaths = [
  "my/profile/upgrade/*",
  "my/profile/top-up/*",
  "my/profile/add-on/*",
  "admin/profile/upgrade/*",
  "admin/profile/top-up/*",
  "admin/profile/add-on/*",
  "editor/profile/upgrade/*",
  "editor/profile/top-up/*",
  "editor/profile/add-on/*",
];

const isMatchedExcludePathNotShowDarkMode = (pathname) => {
  if (pathname.includes("/my") || pathname.includes("/admin") || pathname.includes("/editor")) {
    return excludeSidebarPaths.some((path) => matchPath(path, pathname));
  }
  return true;
};

export {
  excludeSidebarPaths,
  isMatchedExcludePathNotShowDarkMode,
  startOrCloseThemeDark,
  formatCurrency,
  getOptionBreadcrumb,
  normalizeCardNumber,
  beautifyCardNumber,
  getExpirationMonthAndYear,
  normalizeMonth,
  normalizeYear,
  generateImageUrlFromFile,
  triggerClickOutside,
  checkShowSMTPAccount,
  queryParamsDefault,
  queryParamsDefaultForGridLayout,
  checkValidateEmail,
  checkValidateSlug,
  generateFilterParams,
  gernerateBackgroundColor,
  getRandomInt,
  clearLayout,
  checkPermission,
  getFeatureName,
};
