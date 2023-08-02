import { ReactNode, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
// import SidebarGroupIcon from './SidebarGroupIcon';

interface SidebarGroupProp {
  children: ReactNode;
  title: string;
  isShowSidebar?: boolean;
}

const SidebarGroup = ({ children, title, isShowSidebar }: SidebarGroupProp) => {
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
    >
      <div
        className={twMerge(
          'relative mx-3 my-0.5 flex w-[64px] items-center justify-between rounded-lg py-2 pl-4 text-gray-700  transition-width duration-300 hover:bg-slate-200',
          (isShowFullSidebar || isShowSidebar) && 'w-[92%] sm:w-60',
          isShow && (!isShowFullSidebar || !isShowSidebar) && ' bg-slate-200 text-primary-700',
          isShow && (isShowFullSidebar || isShowSidebar) && ' bg-slate-200 font-semibold text-primary-700',
        )}
      >
        <div className="flex h-full w-full items-center">
          <div
            className={twMerge(
              'relative ml-0.5  flex  flex-shrink-0 items-center justify-center rounded-full',
            )}
          >
            <BiChevronRight
              className={twMerge('duration-200', isShow && 'rotate-90', isCollapsed && '')}
              size={26}
            />
          </div>

          <div
            className={twMerge(
              '-mt-[2px] line-clamp-1 text-ellipsis break-all pl-4 text-center text-sm opacity-0',
              (isShowFullSidebar || isShowSidebar) && 'opacity-1',
            )}
            style={{ transition: '.4s', transitionDelay: '.05s' }}
          >
            {title}
          </div>
        </div>
      </div>
      {isShow && children}
    </div>
  );
};

export default SidebarGroup;
