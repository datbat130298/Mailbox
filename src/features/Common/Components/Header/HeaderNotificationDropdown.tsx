/* eslint-disable @typescript-eslint/no-explicit-any */
import { first } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import {
  getNotification,
  markAsRead,
  markAsUnread,
  metaNotification,
} from '../../../../app/Services/User/MyNotificationService';
import useNotify from '../../../Hooks/useNotify';
import useSelector from '../../../Hooks/useSelector';
import HeaderNotificationDropdownEmpty from './HeaderNotificationDropdownEmpty';
import HeaderNotificationDropdownItem, { NotificationType } from './HeaderNotificationDropdownItem';
import HeaderNotificationDropdownSkeleton from './HeaderNotificationDropdownSkeleton';
import HeaderNotificationEndScrollDetector from './HeaderNotificationEndScrollDetector';
import HeaderNotificationFilter from './HeaderNotificationFilter';
import HeaderNotificationTabItem from './HeaderNotificationTabItem';

interface HeaderNotificationDropdownProp {
  isShow: boolean;
  onClose: () => void;
}

interface MetaType {
  total_read: number;
  total_not_read: number;
  total_notifications: number;
  current_page: number;
  last_page: number;
}

const HeaderNotificationDropdown = ({ isShow, onClose }: HeaderNotificationDropdownProp) => {
  const { t } = useTranslation();
  const toast = useNotify();

  const [isLoading, setIsLoading] = useState(false);
  const [notificationList, setNotificationList] = useState<Array<NotificationType>>([]);
  const [meta, setMeta] = useState<MetaType>({} as unknown as MetaType);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    per_page: 8,
  });
  const [selectedTab, setSelectedTab] = useState<string>();

  const user = useSelector((state) => state.user);

  const userPrefixURL = useMemo(() => {
    if (!user) {
      return '/login';
    }

    const role = first(user.roles);

    if (role?.slug !== 'user') {
      return `/${role?.slug}`;
    }

    return '/my';
  }, [user]);

  const navigate = useNavigate();

  const handleReachScrollEnd = useCallback(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, []);

  const getNotificationList = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getNotification(queryParams);
      const metaData = metaNotification;

      if (queryParams.page > 1) {
        setNotificationList((prev) => [...prev, ...data]);
        setMeta(metaData);
        return;
      }

      setNotificationList(data);
      setMeta(metaData);
    } catch (error) {
      setNotificationList([]);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  const handleChangeTab = useCallback((tab: string) => {
    setSelectedTab(tab);
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      status: tab,
    }));
  }, []);

  const handleChangeFilter = useCallback((filter: any) => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      filter,
    }));
  }, []);

  const updateItemAfterMarkAsRead = useCallback(
    (id: number, isRead: boolean) => {
      setNotificationList((prev) => {
        const index = prev.findIndex((item) => item.uuid === id);

        // If in the `all` tab, update the `read` status.
        if (selectedTab === null) {
          // eslint-disable-next-line no-param-reassign
          prev[index].read = isRead;
          return [...prev];
        }

        // Otherwise, remove the item from the list.
        prev.splice(index, 1);
        return [...prev];
      });
    },
    [selectedTab],
  );

  const updateMetaAfterMarkAsRead = useCallback(
    (isRead = true) => {
      setMeta((prev) => ({
        ...prev,
        total_not_read: isRead ? prev.total_not_read + 1 : prev.total_not_read - 1,
        total_read: isRead ? prev.total_read - 1 : prev.total_read + 1,
      }));
    },
    [selectedTab],
  );

  const handleMarkAsRead = useCallback(
    async (id: number) => {
      try {
        await markAsRead(id);

        updateItemAfterMarkAsRead(id, true);
        updateMetaAfterMarkAsRead(false);
      } catch (error) {
        toast.error(t('mark_as_read_error'));
      }
    },
    [updateItemAfterMarkAsRead, updateMetaAfterMarkAsRead],
  );

  const handleMarkAsUnread = useCallback(
    async (id: number) => {
      try {
        await markAsUnread(id);

        updateItemAfterMarkAsRead(id, false);
        updateMetaAfterMarkAsRead(true);
      } catch (error) {
        toast.error(t('mark_as_unread_error'));
      }
    },
    [updateItemAfterMarkAsRead, updateMetaAfterMarkAsRead],
  );

  const handleClickNotification = useCallback(
    (notification: NotificationType) => {
      if (!notification.read) {
        handleMarkAsRead(notification.uuid);
      }

      const { type } = notification;

      if (type === 'campaign') {
        navigate(
          `${userPrefixURL}/email-campaign-management?campaign_uuid=${notification?.campaign?.uuid}&utm_source=notification`,
        );
      }

      if (type === 'scenario') {
        navigate(
          `${userPrefixURL}/scenario-campaign-management?scenario_uuid=${notification?.scenario?.uuid}&utm_source=notification`,
        );
      }

      if (type === 'account') {
        navigate(`${userPrefixURL}/profile?utm_source=notification`);
      }

      if (type === 'payment') {
        navigate(`${userPrefixURL}/profile/payments?utm_source=notification`);
      }

      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    getNotificationList();
  }, [getNotificationList]);

  return (
    <>
      <div
        className={twMerge(
          'absolute -right-[66px] top-[50px] hidden w-[376px] overflow-hidden rounded-lg border-2 border-gray-100 bg-white pt-0 text-slate-700 shadow-xl transition duration-100 ease-linear lg:right-4 lg:top-9 lg:w-[512px] lg:pt-6',
          isShow && 'block',
        )}
      >
        <div
          className={twMerge('border-b-2 border-gray-100  py-1 shadow-lg shadow-gray-100 lg:px-6 lg:py-0')}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 lg:border-none lg:px-0">
            <div className="text-lg font-semibold lg:text-xl">{t('notification_plural')}</div>
            <HeaderNotificationFilter onChange={handleChangeFilter} />
          </div>
          <div className="text-steal-700 px-4 lg:px-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center justify-start space-x-6 lg:mt-3">
                <HeaderNotificationTabItem
                  text={t('all')}
                  id={null}
                  number={meta.total_notifications}
                  isSelected={selectedTab === null}
                  onSelect={handleChangeTab}
                />
                <HeaderNotificationTabItem
                  text={t('unread')}
                  id="unread"
                  number={meta.total_not_read}
                  isSelected={selectedTab === 'unread'}
                  // isLoading={isLoading && queryParams.page === 1}
                  onSelect={handleChangeTab}
                />
                <HeaderNotificationTabItem
                  text={t('read')}
                  id="read"
                  number={meta.total_read}
                  isSelected={selectedTab === 'read'}
                  onSelect={handleChangeTab}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-overlay flex max-h-[512px] flex-col overflow-y-auto px-1 py-1 lg:px-3 lg:py-3">
          {!isLoading && notificationList.length === 0 && <HeaderNotificationDropdownEmpty />}
          {(!isLoading || (isLoading && queryParams.page !== 1)) &&
            notificationList.length > 0 &&
            notificationList.map((item: NotificationType) => (
              <HeaderNotificationDropdownItem
                key={item.uuid}
                notification={item}
                onMarkAsRead={handleMarkAsRead}
                onMarkAsUnread={handleMarkAsUnread}
                onClick={handleClickNotification}
              />
            ))}
          {isLoading && <HeaderNotificationDropdownSkeleton />}
          <HeaderNotificationEndScrollDetector
            isShown={!isLoading && meta.last_page > meta.current_page}
            onReach={handleReachScrollEnd}
          />
        </div>
      </div>
      {!!meta.total_not_read && (
        <div className="absolute right-4 top-0 rounded-full bg-primary-700 px-2 py-0.5 text-[10px] font-semibold text-white">
          {meta.total_not_read < 100 ? meta.total_not_read : '99+'}
        </div>
      )}
    </>
  );
};

export default HeaderNotificationDropdown;
