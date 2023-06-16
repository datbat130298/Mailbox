import _, { first } from 'lodash';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
// import SidebarGroupIcon from './SidebarGroupIcon';

interface SidebarGroupProp {
  id: string;
  children: ReactNode;
  title: string;
  openingIds: string[];
  onOpen: (array: string, id?: boolean) => void;
  isShowSidebar: boolean;
}

const SidebarGroup = ({ id, children, title, openingIds, onOpen, isShowSidebar }: SidebarGroupProp) => {
  const [isShow, setIsShow] = useState(false);
  const isCollapsed = useSelector((state) => !state.layout.isSidebarOpen);
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const sidebarGroupRef = useRef(null);

  const childrenPath = Array.isArray(children) && children?.map((item) => item?.props?.to);

  const location = useLocation();

  const handleOpenSidebarGroup = useCallback(() => {
    if (_.isFunction(onOpen)) {
      onOpen(id);
    } else {
      setIsShow((prev) => !prev);
    }
  }, [id, onOpen]);

  useEffect(() => {
    if (_.includes(openingIds, id)) {
      setIsShow(true);
      return;
    }

    setIsShow(false);
  }, [openingIds]);

  useEffect(() => {
    if (_.includes(childrenPath || [], location.pathname)) {
      onOpen(id, false);
    }
  }, [location.pathname]);

  // Observer the `sidebarRef` to watch the height of the sidebar.
  // When it overflows, the sidebar will be scrolled to the bottom of this group.
  useEffect(() => {
    if (!sidebarGroupRef.current) {
      return undefined;
    }

    const sidebarGroupElement = sidebarGroupRef.current;

    const observer = new ResizeObserver((entries) => {
      const element = first(entries);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { target }: any = element;

      if (!target || target.dataset.isOpen !== 'true') {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { height }: any = element?.contentRect || undefined;
      const top = target.offsetTop;
      const sidebarElement = target.closest('.sidebar');

      if (height + top > window.innerHeight) {
        const activatedItem = target.querySelector('.sidebar-item-activated');

        if (!activatedItem) {
          sidebarElement.scrollTo({
            behavior: 'smooth',
            top: top - 100,
          });
          return;
        }

        const { offsetTop } = activatedItem;

        sidebarElement.scrollTo({
          behavior: 'smooth',
          top: offsetTop - 146,
        });
      }
    });

    observer.observe(sidebarGroupElement);

    return () => {
      observer.disconnect();
    };
  }, [sidebarGroupRef]);

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
          'ml-5 flex w-12 items-center justify-between gap-2 rounded-full py-1 pl-1 hover:bg-slate-200',
          (isShowFullSidebar || isShowSidebar) && 'ml-0 w-full rounded-l-none rounded-r-full pl-6',
          isShow && (isShowFullSidebar || isShowSidebar) && 'bg-slate-200 font-semibold text-primary-700',
          isShow && !isShowFullSidebar && 'ml-4 bg-slate-200 text-primary-700',
          (isShowFullSidebar || isShowSidebar) && 'font-semibold text-primary-700',
          isShowSidebar && 'ml-0 mr-6 w-[255px]',
          !isShowSidebar && 'ml-5',
          isShowFullSidebar && 'ml-0',
        )}
      >
        <div className="flex h-full w-full items-center gap-3">
          <div className={twMerge('relative flex h-8 w-8 items-center rounded-full')}>
            <div className="ml-[3px] flex h-full w-full flex-shrink-0 items-center justify-center">
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
