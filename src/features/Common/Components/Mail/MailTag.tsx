import { useLocation } from 'react-router-dom';

const MailTag = () => {
  const { pathname } = useLocation();
  return (
    <div className="my-1.5 flex h-5 w-fit justify-center rounded-[5px] bg-gray-200 px-1 text-center text-xs leading-5 text-gray-500">
      <div className="h-full w-max px-1 capitalize">{pathname?.split('/').at(-1)}</div>
    </div>
  );
};

export default MailTag;
