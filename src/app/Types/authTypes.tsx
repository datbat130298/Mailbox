import { UserDataType } from './userTypes';

export interface AuthResponseDataType {
  user: UserDataType;
  accessToken: string;
  refreshToken: string;
}
