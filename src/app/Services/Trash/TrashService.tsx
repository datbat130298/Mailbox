import { MailType } from '../../Types/commonTypes';

const dataInbox = [
  {
    id: 5,
    author: 'Khoi Tran',
    subject: 'Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    id: 6,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    id: 7,
    author: 'Khoi Tran 1',
    subject: 'Lorem ipsum',
    body: 'Lorem ipsum dolor sit amet',
  },
  {
    id: 1,
    author: 'Khoi Tran 5',
    subject: 'Hello from KhoiTran',
    body: 'I just assign task for you. Please check at https:// and feedback for me.',
  },
  {
    id: 2,
    author: 'Khoi Tran 8',
    subject: 'Hello from KhoiTran',
    body: 'I just assign task for you. Please check at https:// and feedback for me.',
  },
  {
    id: 3,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    id: 4,
    author: 'Khoi Tran',
    subject: 'Cras vitae scelerisque ex.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },

  {
    id: 8,
    author: 'Khoi Tran',
    subject: 'Bibendum fermentum mi. Quisque in placerat lorem.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    id: 9,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    id: 10,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const datawithDay = dataInbox?.map((item) => ({
  ...item,
  created_at: '2023-05-30T03:29:57+00:00',
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
