import { MailType } from '../../Types/commonTypes';

const getDrafts = () => {
  return new Promise<MailType[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

export { getDrafts };
