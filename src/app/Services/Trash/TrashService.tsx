import { MailType } from '../../Types/commonTypes';

const dataInbox = [
  {
    uuid: 5,
    author: 'Khoi Tran',
    subject: 'Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 6,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 7,
    author: 'Khoi Tran 1',
    subject: 'Lorem ipsum',
    content: 'Lorem ipsum dolor sit amet',
  },
  {
    uuid: 1,
    author: 'Khoi Tran 5',
    subject: 'Hello from KhoiTran',
    content: 'I just assign task for you. Please check at https:// and feedback for me.',
  },
  {
    uuid: 2,
    author: 'Khoi Tran 8',
    subject: 'Hello from KhoiTran',
    content: 'I just assign task for you. Please check at https:// and feedback for me.',
  },
  {
    uuid: 3,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 4,
    author: 'Khoi Tran',
    subject: 'Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },

  {
    uuid: 8,
    author: 'Khoi Tran',
    subject: 'Bibendum fermentum mi. Quisque in placerat lorem.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 9,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 10,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const datawithDay = dataInbox?.map((item) => ({
  ...item,
  time: '2023-05-30T03:29:57+00:00',
  address: 'khoi.tran@techupcorp.com',
}));

const getTrash = () => {
  return new Promise<MailType[]>((resolve) => {
    setTimeout(() => {
      resolve(datawithDay);
    }, 1000);
  });
};

export { getTrash };
