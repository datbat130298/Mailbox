import dayjs from 'dayjs';
import { FocusEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { UserDataType } from '../../../../app/Types/userTypes';
import useSelector from '../../../Hooks/useSelector';
import HeaderNotificationDropdownItemOption from './HeaderNotificationDropdownItemOption';

interface CampaignType {
  uuid: number;
}

interface ScenarioType {
  uuid: number;
}

export interface NotificationType {
  user?: UserDataType;
  uuid: number;
  content: string;
  created_at: string;
  read: boolean;
  type: string;
  campaign?: CampaignType;
  scenario?: ScenarioType;
}

interface HeaderNotificationDropdownItemProp {
  onMarkAsRead: (id: number) => void;
  onMarkAsUnread: (id: number) => void;
  notification: NotificationType;
  onClick: (item: NotificationType) => void;
}

const HeaderNotificationDropdownItem = ({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onClick,
}: HeaderNotificationDropdownItemProp) => {
  const { t } = useTranslation();

  const [isShowOptionDropdown, setIsShowOptionDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const handleFocusOptionDropdown = useCallback((e: FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsShowOptionDropdown(true);
  }, []);

  const handleClickOptionDropdown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleBlurOptionDropdown = useCallback(() => {
    setIsShowOptionDropdown(false);
  }, []);

  const handleClickMarkAsRead = useCallback(async () => {
    setIsShowOptionDropdown(false);
    setIsLoading(true);

    try {
      await onMarkAsRead(notification.uuid);
    } catch (error) {
      // TODO: Handle error
    } finally {
      setIsLoading(false);
    }
  }, [notification, onMarkAsRead]);

  const handleClickMarkAsUnread = useCallback(async () => {
    setIsShowOptionDropdown(false);

    try {
      await onMarkAsUnread(notification.uuid);
    } catch (error) {
      // TODO: Handle error
    } finally {
      setIsLoading(false);
    }
  }, [notification, onMarkAsRead]);

  const handleClickItem = useCallback(() => {
    onClick(notification);
  }, [notification, onClick]);

  return (
    <div
      className={twMerge(
        'group relative mt-0.5 flex items-start space-x-4 rounded-md px-3 py-3 duration-100 hover:cursor-pointer hover:bg-gray-100 lg:space-x-6',
        !notification.read && 'bg-slate-100',
      )}
      role="button"
      tabIndex={0}
      onClick={handleClickItem}
    >
      <div className="mt-0.5 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 lg:h-14 lg:w-14">
        <img
          // src={notification.user?.avatar_img_absolute}
          src={user.avatar_img_absolute}
          alt={notification.user?.email}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-1">
        <div className="flex items-start justify-start">
          <div className="flex-1">{notification.content}</div>
          {!notification.read && <div className="ml-2 mt-1.5 h-3 w-3 rounded-full bg-blue-500" />}
        </div>
        <div className={twMerge('flex items-center justify-between', !notification.read && 'text-blue-500')}>
          <div className="text-xs font-semibold">
            {dayjs(notification.created_at).format('DD/MM/YYYY - HH:mm')}
          </div>
          <div className="text-xs font-semibold">{t(notification.type)}</div>
        </div>
      </div>
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 group-hover:block">
        <button
          type="button"
          className={twMerge(
            'flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-lg duration-100 hover:border-gray-300 hover:bg-gray-200 hover:text-primary-700',
            isShowOptionDropdown && 'border-gray-300 bg-gray-200 text-primary-700',
          )}
          onFocus={(e: FocusEvent) => handleFocusOptionDropdown(e)}
          onBlur={handleBlurOptionDropdown}
          onClick={handleClickOptionDropdown}
        >
          <HiOutlineDotsHorizontal size={24} />
        </button>
        {isShowOptionDropdown && (
          <div
            className={twMerge(
              'absolute right-0 top-12 z-10 w-48 overflow-hidden rounded-lg border-2 border-gray-100 bg-white py-2 text-slate-700 shadow-sm transition duration-100 ease-linear',
            )}
          >
            {!notification.read && (
              <HeaderNotificationDropdownItemOption
                label={t('mark_as_read')}
                icon={<AiOutlineEye size={18} />}
                onClick={handleClickMarkAsRead}
              />
            )}
            {notification.read && (
              <HeaderNotificationDropdownItemOption
                label={t('mark_as_unread')}
                icon={<AiOutlineEyeInvisible size={18} />}
                onClick={handleClickMarkAsUnread}
              />
            )}
          </div>
        )}
      </div>
      {isLoading && (
        <div className="absolute -inset-x-3 inset-y-0 -left-3 z-20 rounded-md bg-white bg-opacity-50" />
      )}
    </div>
  );
};

export default HeaderNotificationDropdownItem;
