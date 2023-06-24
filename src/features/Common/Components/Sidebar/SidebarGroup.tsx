import { ReactNode, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
// import SidebarGroupIcon from './SidebarGroupIcon';

interface SidebarGroupProp {
  id: string;
  children: ReactNode;
  title: string;
  isShowSidebar: boolean;
}

const SidebarGroup = ({ id, children, title, isShowSidebar }: SidebarGroupProp) => {
  const [isShow, setIsShow] = useState(false);
  const isCollapsed = useSelector((state) => !state.layout.isSidebarOpen);
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const handleOpenSidebarGroup = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div
      className={twMerge('group h-fit w-full text-gray-700')}
      role="button"
      tabIndex={0}
      onClick={handleOpenSidebarGroup}
      id={`sidebar-group-${id}`}
    >
      <div
        className={twMerge(
          'ml-5 flex w-12 items-center gap-2 rounded-full py-1 pl-[3px] hover:bg-slate-200',
          (isShowFullSidebar || isShowSidebar) && 'ml-0 w-[265px] rounded-l-none rounded-r-full pl-[23px]',
          isShow && (!isShowFullSidebar || !isShowSidebar) && ' bg-slate-200 text-primary-700',
          isShow && (isShowFullSidebar || isShowSidebar) && ' bg-slate-200 font-semibold text-primary-700',
        )}
      >
        <div className="flex h-full w-full items-center gap-3">
          <div className={twMerge('relative flex h-8 w-8 items-center rounded-full')}>
            <div className="ml-[3px] flex h-full w-full flex-shrink-0 items-center justify-center transition duration-1000">
              <BiChevronRight
                className={twMerge('text-sm duration-200', isShow && 'rotate-90', isCollapsed && '-mr-0.5')}
                size={26}
              />
            </div>
          </div>

          {title && (isShowFullSidebar || isShowSidebar) && (
            <div className={twMerge('-mt-[2px] line-clamp-1 text-ellipsis break-all text-center text-sm ')}>
              {title}
            </div>
          )}
        </div>
      </div>
      {isShow && children}
    </div>
  );
};

export default SidebarGroup;
