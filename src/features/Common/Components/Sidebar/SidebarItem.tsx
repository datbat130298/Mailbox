import { DefaultTFuncReturn } from 'i18next';
import { cloneElement, ReactElement, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
import Tooltip from '../Tooltip/Tooltip';

interface SidebarItemProps {
  to?: string;
  tooltipText: string;
  icon: ReactElement;
  className?: string;
  title?: DefaultTFuncReturn;
}

const SidebarItem = ({ to, icon, title, className, tooltipText }: SidebarItemProps) => {
  const { pathname } = useLocation();
  const isShowSubSideBar = useSelector((state) => state.layout.isShowSubSideBar);

  const isActivated = useMemo(() => {
    if (tooltipText === 'Menu' && isShowSubSideBar) return true;
    if (pathname === to) return true;
    return false;
  }, [pathname, tooltipText, isShowSubSideBar]);

  return (
    <Link
      to={to || pathname}
      className={twMerge(
        'group mb-2 mt-1  flex h-fit w-full flex-shrink-0 items-center justify-center text-gray-700',
        className,
      )}
    >
      <div>
        <Tooltip title={tooltipText}>
          <div className="flex h-fit w-full flex-shrink-0 items-center justify-center">
            <div
              className={twMerge(
                'relative flex h-8 w-12 items-center rounded-full hover:bg-slate-300 hover:text-primary-700',
                isActivated && 'bg-gray-300 text-primary-700',
              )}
            >
              <div className="flex h-full w-full flex-shrink-0 items-center justify-center group-hover:text-primary-700">
                {cloneElement(icon, {
                  className: twMerge('flex-shrink-0 w-max '),
                })}
              </div>
            </div>
          </div>
        </Tooltip>
        {title && (
          <div
            className={twMerge(
              '-mt-[2px] line-clamp-1 h-fit w-full text-ellipsis break-all text-center text-sm group-hover:text-primary-700',
              isActivated && 'text-primary-700',
            )}
          >
            {title}
          </div>
        )}
      </div>
    </Link>
  );
};

export default SidebarItem;
