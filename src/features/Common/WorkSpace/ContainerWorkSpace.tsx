import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../Hooks/useSelector';
import SubSidebarContainer from '../Components/SubSidebar/SubSidebar';
import SubSidebarInbox from './Inbox/SubSidebarInbox';
import WorkSpaceRoutes from './WorkSpaceRoutes';

const ContainerWorkSpace = () => {
  const isShowSubSideBar = useSelector((state) => state.layout.isShowSubSideBar);

  useEffect(() => {
    window.document.title = `Maibox - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="flex h-full w-full justify-start bg-slate-100 pl-4 pr-2">
      {isShowSubSideBar && (
        <SubSidebarContainer>
          <SubSidebarInbox />
        </SubSidebarContainer>
      )}
      <div
        className={twMerge(
          'h-full w-full rounded-lg bg-white shadow-box',
          isShowSubSideBar && 'w-[calc(100%-208px)]',
        )}
      >
        <WorkSpaceRoutes />
      </div>
    </div>
  );
};

export default ContainerWorkSpace;
