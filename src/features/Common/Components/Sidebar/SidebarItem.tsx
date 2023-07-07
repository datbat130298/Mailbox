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
  isShowSidebar = true,
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
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        to={to || pathname}
        className={twMerge(
          'relative mx-3 my-0.5 flex w-[60px] items-center justify-between overflow-hidden rounded-md py-[11px] pl-5 text-gray-700  transition-width duration-300 before:absolute before:left-0 before:top-1/2 before:h-2/3 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-primary-800 hover:bg-slate-200',
          (isShowFullSidebar || isShowSidebar) && 'w-64',
          isActivated
            ? 'bg-slate-200 font-semibold text-primary-600 before:block'
            : 'text-slate-700 before:hidden',
          className,
        )}
      >
        <div className="relative flex flex-shrink-0 items-center justify-center text-slate-800">
          {cloneElement(icon, {
            className: twMerge('flex-shrink-0 w-max '),
          })}
          {quantity && !isShowFullSidebar && (
            <div className="absolute -top-3 left-[9px] text-primary-600">
              <RxDotFilled size={25} />
            </div>
          )}
          <div
            className={twMerge(
              'pl-4 text-sm opacity-0 transition-[.4s] delay-[.05s]',
              (isShowFullSidebar || isShowSidebar) && 'opacity-100',
            )}
          >
            {title}
          </div>
        </div>
        <div
          className={twMerge(
            'pr-6 text-xs text-gray-500 opacity-0 transition-[.4s] delay-[.05s]',
            (isShowFullSidebar || isShowSidebar) && 'font-semibold text-primary-700 opacity-100',
          )}
        >
          {quantity || ''}
        </div>
      </Link>
    </Tooltip>
  );
};

export default SidebarItem;
