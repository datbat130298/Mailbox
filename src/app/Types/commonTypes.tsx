import { PaginationState } from '@tanstack/react-table';
import { AxiosError, AxiosResponse } from 'axios';
import { Dayjs } from 'dayjs';
import { SentListEmailProp } from '../../features/Common/Components/Mail/MailTableContainer/MailTableContainer';
import { EmailType } from '../../features/Common/Components/SelectMultiEmail/SelectMultiEmail';
import { ComposeViewTypeEnum, StatusSent, TypeChat } from '../Enums/commonEnums';
import { TableColumnFilterState } from './elementTypes';
import { UserDataType } from './userTypes';

export interface AuthTokensType {
  access_token: string;
  refresh_token: string;
  token?: string;
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
  searchBy?: string[];
  searchValue?: string;
  searchTerm?: string;
  source?: string;
  body?: string;
  subject?: string;
  fromMail?: string;
  toMail?: string;
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

export interface AttachmentType {
  file_name: string;
  url: string;
  file_size: number;
  absolute_slug?: string;
}

export interface MailType {
  id: number;
  author: string;
  subject: string;
  body: string;
  created_at: string;
  address: string;
  read?: boolean;
  star?: boolean;
  type?: string;
  from_user?: UserDataType;
  inbox?: Array<MailType>;
  status?: StatusSent;
  sents_email_address?: Array<SentListEmailProp>;
  bcc?: Array<SentListEmailProp>;
  cc?: Array<SentListEmailProp>;
  email_address: string;
  email?: MailType;
  email_account?: UserDataType;
  email_addresses?: string;
  from_email?: string;
  attachments?: Array<AttachmentType>;
  source?: TypeChat;
  schedule_at?: string;
}

export interface FlagType {
  code: string;
  name: string;
  flag_image: string;
}

export interface ComposePopupStyleType {
  containerClassName: string;
  composeClassName: string;
  composeContent?: string;
  composeToolbarStyle?: string;
}

export interface ContactType {
  id: string;
  avatar: string;
  email: string;
}

export interface ComposeType {
  uuid?: string;
  isShow?: boolean;
  recipient?: EmailType[];
  recipientCc?: EmailType[];
  recipientBcc?: EmailType[];
  subject?: string;
  body?: string;
  viewType: ComposeViewTypeEnum;
  typeMail?: string;
}
