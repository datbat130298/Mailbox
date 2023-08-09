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
  address: 'khoi.tran@techupcorp.com',
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNotification = (queryParams: any) => {
  console.log(queryParams);
  return new Promise<NotificationType[]>((resolve) => {
    setTimeout(() => {
      resolve(dataWithDay);
    }, 1000);
  });
};

const markAsRead = (id: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 1000);
  });
};

const markAsUnread = (id: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 1000);
  });
};

const metaNotification = {
  current_page: 1,
  from: 1,
  last_page: 10,
  links: [
    {
      url: null,
      label: '&laquo; Previous',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=1',
      label: '1',
      active: true,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=2',
      label: '2',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=3',
      label: '3',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=4',
      label: '4',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=5',
      label: '5',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=6',
      label: '6',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=7',
      label: '7',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=8',
      label: '8',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=9',
      label: '9',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=10',
      label: '10',
      active: false,
    },
    {
      url: 'https://api.send.techupzone.com/api/my/notifications?page=2',
      label: 'Next &raquo;',
      active: false,
    },
  ],
  path: 'https://api.send.techupzone.com/api/my/notifications',
  per_page: '8',
  to: 8,
  total: 79,
  total_notifications: 79,
  total_read: 18,
  total_not_read: 61,
};

export { getNotification, markAsRead, markAsUnread, metaNotification };
