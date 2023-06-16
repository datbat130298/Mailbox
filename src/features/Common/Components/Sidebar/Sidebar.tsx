import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsChatLeftText } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import {
  MdLabelImportantOutline,
  MdOutlineDrafts,
  MdOutlineScheduleSend,
  MdScheduleSend,
} from 'react-icons/md';
import { RiSpam2Line } from 'react-icons/ri';
import { TbMail } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
import ComposeButton from './ComposeButton';
import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { t } = useTranslation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const [openingSidebarGroup, setOpeningSidebarGroup] = useState(['saleCRM']);

  const handleOpenSidebarGroup = useCallback((id: string, autoCollapse = true) => {
    setOpeningSidebarGroup((prev) => {
      if (!autoCollapse) {
        return [id];
      }

      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [id];
    });
  }, []);

  const handleMouseMove = () => {
    return setIsShowSidebar(true);
  };

  const handleMouseOver = () => {
    return setIsShowSidebar(false);
  };

  const InboxUnread = 132;
  const Draft = 123;

  return (
    <div
      className={twMerge(
        'fixed left-0 top-0 z-[49] h-screen w-[72px] bg-slate-100 py-6 pt-20 ',
        isShowFullSidebar && 'w-[255px]',
        isShowSidebar && 'w-[279px]',
      )}
      onMouseMove={() => handleMouseMove()}
      onMouseLeave={() => handleMouseOver()}
    >
      <ComposeButton isShowSidebar={isShowSidebar} />
      <div className="pt-3">
        <SidebarItem
          to="/inbox"
          title={t('inbox')}
          tooltipText={t('inbox')}
          icon={<TbMail size={22} />}
          quantity={InboxUnread}
          isShowSidebar={isShowSidebar}
        />
        <SidebarItem
          to="/sent"
          title={t('sent')}
          tooltipText={t('sent')}
          icon={<MdOutlineScheduleSend size={21} />}
          isShowSidebar={isShowSidebar}
        />
        <SidebarItem
          to="/drafts"
          title={t('drafts')}
          tooltipText={t('drafts')}
          icon={<MdOutlineDrafts size={20} />}
          quantity={Draft}
          isShowSidebar={isShowSidebar}
        />
        <SidebarItem
          to="/trash"
          title={t('trash')}
          tooltipText={t('trash')}
          icon={<FiTrash2 size={18} />}
          isShowSidebar={isShowSidebar}
        />
        <SidebarGroup
          id="more"
          title={t('more')}
          openingIds={openingSidebarGroup}
          onOpen={handleOpenSidebarGroup}
          isShowSidebar={isShowSidebar}
        >
          <SidebarItem
            to="/spam"
            title={t('spam')}
            tooltipText={t('spam')}
            icon={<RiSpam2Line size={18} />}
            isShowSidebar={isShowSidebar}
          />
          <SidebarItem
            to="/important"
            title={t('important')}
            tooltipText={t('important')}
            icon={<MdLabelImportantOutline size={18} />}
            isShowSidebar={isShowSidebar}
          />
          <SidebarItem
            to="/schedules"
            title={t('schedules')}
            tooltipText={t('schedules')}
            icon={<MdScheduleSend size={18} />}
            isShowSidebar={isShowSidebar}
          />
          <SidebarItem
            to="/chats"
            title={t('chats')}
            tooltipText={t('chats')}
            icon={<BsChatLeftText size={16} />}
            isShowSidebar={isShowSidebar}
          />
        </SidebarGroup>
      </div>
    </div>
  );
};
export default Sidebar;
