import { cloneElement, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Tooltip from '../Tooltip/Tooltip';

interface SidebarItemProps {
  to: string;
  tooltipText: string;
  icon: any;
  className?: string;
  title?: string;
}

const SidebarItem = ({ to, icon, title, className, tooltipText }: SidebarItemProps) => {
  const { pathname } = useLocation();

  const isActivated = useMemo(() => {
    if (tooltipText === 'Menu') return true;
    if (pathname === to) return true;
    return false;
  }, [pathname, tooltipText]);

  return (
    <Link
      to={to}
      className={twMerge(
        'group mt-1  flex h-fit w-full flex-shrink-0 items-center justify-center',
        className,
      )}
    >
      <div>
        <Tooltip title={tooltipText}>
          <div className="flex h-fit w-full flex-shrink-0 items-center justify-center">
            <div
              className={twMerge(
                'relative flex h-12 w-12 items-center rounded-full hover:bg-gray-200 hover:text-primary-700',
                isActivated && 'bg-gray-200 text-primary-700',
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
              'line-clamp-1 h-fit w-full text-ellipsis break-all text-center text-sm group-hover:text-primary-700',
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
