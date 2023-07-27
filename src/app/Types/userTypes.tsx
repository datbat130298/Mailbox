import { MultiValue } from 'react-select';
import { ImageType } from './commonTypes';
import { ModalProps } from './configTypes';
import { SelectOptionType } from './elementTypes';
// eslint-disable-next-line import/no-cycle

export interface UserRoleType {
  uuid: number;
  name: string;
  slug?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserConfigType {
  uuid: number;
  name: string;
  slug: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserDetailType {
  uuid: number;
}

export interface UserDataType {
  uuid: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  banned_at?: string;
  avatar_img?: string;
  avatar_img_absolute?: string;
  cover_img?: string;
  cover_img_absolute?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  roles: UserRoleType[];
  config?: UserConfigType;
  token: string;
}

export interface UserFormDataType {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: MultiValue<SelectOptionType> | undefined;
  avatar_img?: File[] | ImageType[];
}

export interface UserFormErrorType {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  roles?: string;
  avatar_img?: string;
  password?: string;
  password_confirmation?: string;
}

export interface UserModifyModalProps extends Omit<ModalProps, 'onSubmit'> {
  user?: UserDataType | null;
  errors?: UserFormErrorType;
  onSubmit: (data: UserFormDataType) => Promise<void>;
}

export interface FetchFileDataParamType {
  page: number;
}
