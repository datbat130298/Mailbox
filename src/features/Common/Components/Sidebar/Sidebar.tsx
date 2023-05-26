import { useCallback } from 'react';
import { AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeftText, BsTrash } from 'react-icons/bs';
import { MdOutlineDrafts } from 'react-icons/md';
import { setIsShowSubSidebar } from '../../../../app/Slices/layoutSlice';
import useDispatch from '../../../Hooks/useDispatch';
import useSelector from '../../../Hooks/useSelector';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isShowSubSideBar = useSelector((state) => state.layout.isShowSubSideBar);

  const handleShowSubSidebar = useCallback(() => {
    if (isShowSubSideBar) {
      return dispatch(setIsShowSubSidebar(false));
    }
    return dispatch(setIsShowSubSidebar(true));
  }, [isShowSubSideBar]);

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-[72px] bg-gray-100 px-1 py-6 shadow">
      <div role="button" tabIndex={0} onClick={handleShowSubSidebar}>
        <SidebarItem tooltipText="Menu" icon={<AiOutlineMenu size={20} />} className="mb-4" />
      </div>
      <SidebarItem to="/inbox" title="Inbox" tooltipText="Inbox" icon={<AiOutlineMail size={20} />} />
      <SidebarItem to="/sent" title="Sent" tooltipText="Sent" icon={<BsChatLeftText size={18} />} />
      <SidebarItem to="/drafts" title="Drafts" tooltipText="Drafts" icon={<MdOutlineDrafts size={22} />} />
      <SidebarItem to="/trash" title="Trash" tooltipText="Trash" icon={<BsTrash size={20} />} />
    </div>
  );
};
export default Sidebar;
