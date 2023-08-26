/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from '../../../features/utils/Http/axiosInstance';
import { ContactType } from '../../Types/commonTypes';
import { generateParamString } from '../Common/CommonService';

const dataContact = [
  {
    id: '0',
    email: 'email0@gmail.com',
    avatar: 'https://fandom.vn/wp-content/uploads/2019/04/naruto-uchiha-itachi-1.jpg',
  },
  {
    id: '1',
    email: 'email1@gmail.com',
    avatar: 'https://vietotaku.com/wp-content/uploads/2020/04/bi-mat-itachi.jpg?v=1636338008',
  },
  {
    id: '2',
    email: 'email2@gmail.com',
    avatar:
      'https://i.ex-cdn.com/mgn.vn/files/news/2022/09/04/naruto-can-benh-cua-itachi-da-lam-anh-ay-yeu-di-den-muc-nao-173407.jpg',
  },
  {
    id: '3',
    email: 'email3@gmail.com',
    avatar:
      'https://i.ex-cdn.com/mgn.vn/files/news/2022/09/04/naruto-can-benh-cua-itachi-da-lam-anh-ay-yeu-di-den-muc-nao-173407.jpg',
  },
  {
    id: '4',
    email: 'email4@gmail.com',
    avatar:
      'https://i.ex-cdn.com/mgn.vn/files/news/2022/09/04/naruto-can-benh-cua-itachi-da-lam-anh-ay-yeu-di-den-muc-nao-173407.jpg',
  },
  {
    id: '5',
    email: 'email5@gmail.com',
    avatar:
      'https://i.ex-cdn.com/mgn.vn/files/news/2022/09/04/naruto-can-benh-cua-itachi-da-lam-anh-ay-yeu-di-den-muc-nao-173407.jpg',
  },
];

const getContacts = () => {
  return new Promise<ContactType[]>((resolve) => {
    setTimeout(() => {
      resolve(dataContact);
    }, 1000);
  });
};

const getMyContact = async (options: any) => {
  const paramString = generateParamString(
    {
      'search_by[]': options?.searchBy,
      search: options?.searchValue,
      [`filter[${options?.type}]`]: options?.searchTerm,
      // [`filter[exact__${options?.typeArray}]`]: [options?.arraySearch],
      [`filter[${options?.typeRelative}]`]: options?.searchTermRelative,
      [`filter[from__${options?.typeDate}]`]: options?.fromDate,
      [`filter[to__${options?.typeDate}]`]: options?.toDate,
      [`sort`]: options?.sortTerm,
      page: options?.page || 1,
      per_page: options?.per_page,
    },
    options?.filterParams,
  );
  const response = await axiosInstance.get(`/api/my/contacts?${paramString}`);
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export { getContacts, getMyContact };
