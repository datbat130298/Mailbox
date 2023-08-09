import { NotificationType } from '../../../features/Common/Components/Header/HeaderNotificationDropdownItem';

const dataNotification = [
  {
    uuid: 1,
    content: 'this is notification 1',
    read: true,
    type: 'sent',
  },
  {
    uuid: 2,
    content: 'this is notification 2',
    read: true,
    type: 'inbox',
  },
  {
    uuid: 3,
    content: 'this is notification 3',
    read: true,
    type: 'sent',
  },
  {
    uuid: 4,
    content: 'this is notification 4',
    read: true,
    type: 'inbox',
  },
];

const dataWithDay = dataNotification?.map((item) => ({
  ...item,
  created_at: '2023-05-30T03:29:57+00:00',
}));

const getNotificationCategories = () => {
  return new Promise<NotificationType[]>((resolve) => {
    setTimeout(() => {
      resolve(dataWithDay);
    }, 1000);
  });
};

export { getNotificationCategories };
