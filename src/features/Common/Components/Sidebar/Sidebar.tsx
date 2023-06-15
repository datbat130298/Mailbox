import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiTrash2 } from 'react-icons/fi';
import { MdOutlineDrafts, MdOutlineScheduleSend } from 'react-icons/md';
import { TbMail } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
import ComposeButton from './ComposeButton';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { t } = useTranslation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

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
      </div>
    </div>
  );
};
export default Sidebar;
