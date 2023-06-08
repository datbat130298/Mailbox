import { ContactType } from '../../Types/commonTypes';

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

export { getContacts };
