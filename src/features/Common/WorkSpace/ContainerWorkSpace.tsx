import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../Hooks/useSelector';
import Sidebar from '../Components/Sidebar/Sidebar';
import ButtonComposeFixed from './ButtonComposeFixed/ButtonComposeFixed';
import ComposeModalMobile from './ButtonComposeFixed/ComposeModalMobile';
import WorkSpaceRoutes from './WorkSpaceRoutes';

const ContainerWorkSpace = () => {
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

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
    <div className="flex h-full w-full justify-end overflow-x-hidden bg-slate-100 pl-2 pr-2 lg:pl-4">
      <Sidebar />
      <div
        className={twMerge(
          'w-100% relative mt-px h-[calc(100%-1px)] overflow-hidden rounded-t-lg bg-white shadow-box lg:w-[calc(100%-75px)]',
          isShowFullSidebar && 'lg:w-[calc(100%-265px)]',
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
