import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../Hooks/useSelector';
import Sidebar from '../Components/Sidebar/Sidebar';
import ButtonComposeFixed from './ButtonComposeFixed/ButtonComposeFixed';
import ComposeModalMobile from './ButtonComposeFixed/ComposeModalMobile';
import WorkSpaceRoutes from './WorkSpaceRoutes';

const ContainerWorkSpace = () => {
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);
  const userSid = useSelector((state) => state.user.sid);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleClickButtonAddCompose = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    window.document.title = `Mailbox - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="flex h-full w-full justify-end overflow-x-hidden bg-gray-100 pl-2 pr-2 lg:pl-4">
      {userSid && <Sidebar />}
      <div
        className={twMerge(
          'w-100% relative mt-px h-[calc(100%-1px)] flex-1 overflow-hidden rounded-t-lg bg-white shadow-box lg:w-[calc(100%-75px)] lg:flex-none',
          isShowFullSidebar && 'lg:w-[calc(100%-250px)]',
        )}
      >
        <WorkSpaceRoutes />
        <ButtonComposeFixed onClick={handleClickButtonAddCompose} />
        <ComposeModalMobile isOpen={isShowModal} onClose={() => setIsShowModal(false)} />
      </div>
    </div>
  );
};

export default ContainerWorkSpace;
