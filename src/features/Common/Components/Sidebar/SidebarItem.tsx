import _ from 'lodash';
import { cloneElement, ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LuDot } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { setIsShowFullSidebar } from '../../../../app/Slices/layoutSlice';
import useDispatch from '../../../Hooks/useDispatch';
import useSelector from '../../../Hooks/useSelector';
import GetIconByKey from './Labels/GetIconByKey';

interface SidebarItemProps {
  to?: string;
  tooltipText: string;
  icon?: ReactElement;
  className?: string;
  title: string;
  quantity?: number;
  isShowSidebar?: boolean;
  onCloseMobile?: () => void;
}

const SidebarItem = ({
  to,
  icon,
  title,
  className,
  tooltipText,
  quantity,
  isShowSidebar = true,
  onCloseMobile,
}: SidebarItemProps) => {
  const { pathname } = useLocation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isActivated = useMemo(() => {
    if (tooltipText === 'Menu' && (isShowFullSidebar || isShowSidebar)) return true;
    if (pathname === to) return true;
    return false;
  }, [pathname, tooltipText, isShowFullSidebar, isShowSidebar]);

  const handleClickSidebarItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (_.isFunction(onCloseMobile)) onCloseMobile();
    if (window.screen.width <= 620) {
      dispatch(setIsShowFullSidebar(false));
    }
  };

  return (
    // <Tooltip position="right" title={tooltipText || ''}>
    <Link
      onClick={handleClickSidebarItem}
      to={to || pathname}
      className={twMerge(
        'relative mx-3 my-0.5 flex w-[64px] items-center justify-between overflow-hidden rounded-md py-[11px] pl-5 text-gray-700  transition-width duration-300 before:absolute before:left-0 before:top-1/2 before:h-2/3 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-blue-700 hover:bg-slate-200',
        (isShowFullSidebar || isShowSidebar) && 'w-[92%] sm:w-[235px]',
        isActivated ? 'bg-slate-200 font-semibold before:block' : 'text-mainColor-500 before:hidden',
        className,
      )}
    >
      <div
        className={twMerge(
          'relative ml-px flex flex-shrink-0 items-center justify-center text-gray-500 ',
          // fix again
          quantity !== 0 && title === 'inbox' && 'text-mainColor-500',
          isActivated && 'text-mainColor-500',
          !isActivated && isShowFullSidebar && quantity !== 0 && title === 'inbox' && 'text-gray-500',
        )}
      >
        {icon ? (
          <div className="flex w-6 items-center justify-center text-gray-500">
            {cloneElement(icon, {
              className: twMerge(''),
            })}
          </div>
        ) : (
          <GetIconByKey name={title} />
        )}

        {title === TypeChat.INBOX && quantity !== 0 && !isShowFullSidebar && (
          <div className="absolute -top-5 left-3 text-mainColor-500">
            <LuDot size={40} />
          </div>
        )}
        <div
          className={twMerge(
            'pl-4 text-sm font-semibold text-gray-700 opacity-0 transition-[.4s] delay-[.05s]',
            (isShowFullSidebar || isShowSidebar) && 'opacity-100',
            isActivated && 'text-blue-700',
          )}
        >
          {t(title)}
        </div>
      </div>
      <div
        className={twMerge(
          'pr-6 text-xs font-semibold text-gray-500 opacity-0 transition-[.4s] delay-[.05s]',
          (isShowFullSidebar || isShowSidebar) && 'font-semibold text-gray-700 opacity-100',
          isActivated && 'text-blue-700',
        )}
      >
        {title === TypeChat.INBOX && quantity !== 0 && quantity}
      </div>
    </Link>
    // </Tooltip>
  );
};

export default SidebarItem;
