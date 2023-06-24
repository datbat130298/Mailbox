import { DefaultTFuncReturn } from 'i18next';
import { cloneElement, ReactElement, useMemo } from 'react';
import { RxDotFilled } from 'react-icons/rx';
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
  quantity?: number;
  isShowSidebar?: boolean;
}

const SidebarItem = ({
  to,
  icon,
  title,
  className,
  tooltipText,
  quantity,
  isShowSidebar,
}: SidebarItemProps) => {
  const { pathname } = useLocation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const isActivated = useMemo(() => {
    if (tooltipText === 'Menu' && (isShowFullSidebar || isShowSidebar)) return true;
    if (pathname === to) return true;
    return false;
  }, [pathname, tooltipText, isShowFullSidebar, isShowSidebar]);

  return (
    <Tooltip position="right" title={tooltipText || ''}>
      <Link
        to={to || pathname}
        className={twMerge(
          'group flex h-fit w-full flex-shrink-0 items-center justify-center text-gray-700',
          className,
        )}
      >
        <div
          className={twMerge(
            'ml-2 flex w-12 items-center justify-between gap-2 rounded-full py-1 pl-1 hover:bg-slate-200',
            (isShowFullSidebar || isShowSidebar) && 'ml-0 mr-6 w-full rounded-l-none rounded-r-full pl-6',
            isActivated && !isShowFullSidebar && 'ml-2 bg-slate-300 text-primary-700',
            isActivated &&
              (isShowFullSidebar || isShowSidebar) &&
              'ml-0 bg-slate-300 font-semibold text-primary-700',
            quantity && (isShowFullSidebar || isShowSidebar) && 'font-semibold text-primary-700',
            // isShowSidebar && 'ml-0 mr-6',
          )}
        >
          <div className="flex h-full w-full items-center gap-3">
            <div className={twMerge('relative flex h-8 w-8 items-center rounded-full')}>
              <div className="ml-[3px] flex h-full w-full flex-shrink-0 items-center justify-center">
                {cloneElement(icon, {
                  className: twMerge('flex-shrink-0 w-max '),
                })}
                {quantity && !isShowFullSidebar && (
                  <div className="absolute -right-[13px] -top-1.5 text-primary-600">
                    <RxDotFilled size={25} />
                  </div>
                )}
              </div>
            </div>

            {title && (isShowFullSidebar || isShowSidebar) && (
              <div className={twMerge('-mt-[2px] line-clamp-1 text-ellipsis break-all text-center text-sm ')}>
                {title}
              </div>
            )}
          </div>
          {quantity && (isShowFullSidebar || isShowSidebar) && (
            <div
              className={twMerge(
                'pr-5 text-xs text-gray-500',
                (isShowFullSidebar || isShowSidebar) && isActivated && 'font-semibold text-primary-700',
              )}
            >
              {quantity}
            </div>
          )}
        </div>
      </Link>
    </Tooltip>
  );
};

export default SidebarItem;
