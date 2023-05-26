const numberArray = [
  1, 2, 3, 4, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
];

const dataInbox = numberArray.map((item) => ({
  title: 'Mail from Khoi',
  uuid: item,
}));

const getInboxs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataInbox);
    }, 1000);
  });
};

export { getInboxs };
