export const USER_ROLE = {
  SYSTEM: process.env.REACT_APP_ROLE_APP_SYSTEM as string,
  ADMIN: process.env.REACT_APP_ROLE_APP_ADMIN as string,
  USER: process.env.REACT_APP_ROLE_USER_OWNER as string,
} as const;
