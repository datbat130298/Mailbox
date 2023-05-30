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
  {
    uuid: 11,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 12,
    author: 'Khoi Tran',
    subject: 'Bibendum fermentum mi. Quisque in placerat lorem.',
    content:
      'Bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 13,
    author: 'Khoi Tran',
    subject:
      'Bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 14,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 15,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 16,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 17,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 18,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 19,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 20,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 21,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
];

const datawithDay = dataInbox?.map((item) => ({ ...item, time: 'May 29' }));

const getSents = () => {
  return new Promise<MailType[]>((resolve) => {
    setTimeout(() => {
      resolve(datawithDay);
    }, 1000);
  });
};

export { getSents };
