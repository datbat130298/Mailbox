import { PaginationState } from '@tanstack/react-table';
import { AxiosError, AxiosResponse } from 'axios';
import { Dayjs } from 'dayjs';
import { OptionLabel } from '../../features/Common/Components/ComposePopup/Components/ComposePopupRecipient/ComposePopupSelectRecipients';
import { ComposeViewTypeEnum } from '../Enums/commonEnums';
import { TableColumnFilterState } from './elementTypes';
import { UserDataType } from './userTypes';

export interface AuthTokensType {
  accessToken: string;
  refreshToken: string;
}

export interface AuthLoginType {
  email: string;
  password: string;
}

export interface AuthRegisterFormDataType {
  username: string;
  fullName: string;
  email: string | null;
  password: string;
  passwordConfirmation: string;
}

export type AxiosErrorMessageType = Record<string, string[]>;

export interface AxiosErrorDataType {
  statusCode: number;
  message: string;
  errors: AxiosErrorMessageType[];
  code: string;
}

export type AxiosErrorType = AxiosError<AxiosErrorDataType>;

export interface PaginationType extends Omit<PaginationState, 'pageIndex' | 'pageSize'> {
  pageIndex?: number;
  pageSize?: number;
  totalRows?: number;
  totalPages?: number;
}

export interface ResponseMetaType {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  to?: number;
}

export interface ResponseDataWithMetaType<T = unknown> extends Partial<AxiosResponse> {
  data: T;
  meta: ResponseMetaType;
}

export interface AxiosResponseType<T> extends AxiosResponse {
  statusCode: number;
  message: string;
  meta: ResponseMetaType;
  data: {
    data: T;
  };
}

export type TableColumnFiltersState = TableColumnFilterState[];

export interface BaseQueryParamsType {
  page?: number;
  perPage?: number;
  type?: string;
  query?: string;
  filterBy?: string;
  filterValue?: string;
  filterParams?: TableColumnFiltersState;
  start?: string;
  end?: string;
}

export interface FilterOptionItemType {
  [key: string]: string;
  uuid: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableGenericDataType = any;

export type TableHeaderFilterByType = string | string[];

export interface ImageType extends Partial<File> {
  slug: string;
  absolute_slug: string;
}

export type ResponseErrorType = string | string[];

export interface DeleteParamByKey {
  pre: string;
  key: string;
}

export interface AddParamByKey {
  pre: string;
  key: string;
  value: string;
}

export interface DatePickerRangeType {
  start: Dayjs | null;
  end: Dayjs | null;
}

export interface MailType {
  uuid: number;
  author: string;
  subject: string;
  content: string;
  time: string;
  address: string;
  readed?: boolean;
  from_user?: UserDataType;
}

export interface FlagType {
  code: string;
  name: string;
  flag_image: string;
}

export interface ComposePopupStyleType {
  containerClassName: string;
  composeClassName: string;
}

export interface ContactType {
  id: string;
  avatar: string;
  email: string;
}

export interface ComposeType {
  uuid: number;
  isShow: boolean;
  recipient?: readonly OptionLabel[];
  recipientCc?: readonly OptionLabel[];
  recipientBcc?: readonly OptionLabel[];
  subject?: string;
  content?: string;
  viewType: ComposeViewTypeEnum;
}
