import { MailType } from '../../Types/commonTypes';

const dataInbox = [
  {
    uuid: 1,
    readed: false,
    author: 'Khoi Tran',
    subject: 'Hello from KhoiTran',
    content: 'I just assign task for you. Please check at https:// and feedback for me.',
  },
  {
    uuid: 2,
    readed: true,
    author: 'Khoi Tran',
    subject: 'Hello from KhoiTran',
    content: 'I just assign task for you. Please check at https:// and feedback for me.',
  },
  {
    uuid: 3,
    readed: true,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 4,
    readed: false,
    author: 'Khoi Tran',
    subject: 'Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 5,
    readed: false,
    author: 'Khoi Tran',
    subject: 'Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 6,
    readed: false,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 7,
    readed: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 8,
    readed: true,
    author: 'Khoi Tran',
    subject: 'Bibendum fermentum mi. Quisque in placerat lorem.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 9,
    readed: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.vLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.v Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 10,
    readed: true,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    uuid: 11,
    readed: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 12,
    readed: true,
    author: 'Khoi Tran',
    subject: 'Bibendum fermentum mi. Quisque in placerat lorem.',
    content:
      'Bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 13,
    readed: false,
    author: 'Khoi Tran',
    subject:
      'Bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 14,
    readed: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 15,
    readed: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 16,
    readed: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 17,
    readed: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 18,
    readed: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 19,
    readed: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 20,
    readed: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 21,
    readed: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
];

const datawithDay = dataInbox?.map((item) => ({
  ...item,
  time: '2023-05-30T03:29:57+00:00',
  address: 'khoi.tran@techupcorp.com',
  from_user: {
    uuid: 311,
    username: 'khoi.tran@techupcorp.com',
    first_name: 'Khoi',
    last_name: 'Tran',
    email: 'khoi.tran@techupcorp.com',
    roles: [
      {
        uuid: 1,
        name: 'User',
      },
    ],
  },
}));

const getInboxs = () => {
  return new Promise<MailType[]>((resolve) => {
    setTimeout(() => {
      resolve(datawithDay);
    }, 1000);
  });
};

export { getInboxs };
