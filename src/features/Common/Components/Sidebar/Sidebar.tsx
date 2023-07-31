import _ from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiSettings3Line } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
import { DisplayLabel } from '../../WorkSpace/Settings/LabelTable';
import ButtonAddLabel from '../Labels/ButtonAddLabel';
import ComposeButton from './ComposeButton';
import LabelManagement from './Labels/LabelManagement';
import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { t } = useTranslation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const { labelSystem } = useSelector((state) => state.labelSidebar);
  const { categoryLabel } = useSelector((state) => state.labelSidebar);
  const sidebarElement = useRef<HTMLDivElement>(null);

  const categoryItemDisplay = categoryLabel.filter((item) =>
    item.display.find((displayItem) => displayItem.show === true),
  );

  const visibleSide = useMemo(() => {
    return labelSystem.filter((item) => {
      if (_.isEmpty(item.display)) {
        return item;
      }
      return (item.display as DisplayLabel[]).find((displayItem: DisplayLabel) => displayItem.show === true);
    });
  }, [labelSystem]);

  const hiddenSidebar = useMemo(() => {
    return labelSystem.filter((item) =>
      (item.display as DisplayLabel[]).find((displayItem: DisplayLabel) => displayItem.show === false),
    );
  }, [labelSystem]);

  const handleMouseMove = () => {
    return setIsShowSidebar(false);
  };

  const handleMouseOver = () => {
    return setIsShowSidebar(false);
  };

  return (
    <div
      className={twMerge(
        'fixed left-0 top-0 z-[49] mt-px h-screen w-0 bg-slate-100 py-6 pt-20 sm:w-20',
        (isShowFullSidebar || isShowSidebar) && 'w-0 sm:w-[270px]',
      )}
      style={{ transition: '.2s ease-in-out' }}
      onMouseMove={() => handleMouseMove()}
      onMouseLeave={() => handleMouseOver()}
      ref={sidebarElement}
      id="sidebar"
    >
      <ComposeButton isShowSidebar={isShowSidebar} />
      <div className="h-[95%] overflow-hidden py-3 hover:overflow-y-auto">
        {visibleSide &&
          visibleSide.map((visibleSideItem) => (
            <SidebarItem
              key={visibleSideItem.id}
              to={visibleSideItem.to}
              title={t(visibleSideItem.name)}
              tooltipText={t(visibleSideItem.name)}
              icon={visibleSideItem.icon}
              quantity={visibleSideItem.quantity}
              isShowSidebar={isShowSidebar}
            />
          ))}

        <SidebarGroup title={t('more')} isShowSidebar={isShowSidebar}>
          {hiddenSidebar.map((hiddenSidebarItem) => (
            <SidebarItem
              key={hiddenSidebarItem.id}
              to={hiddenSidebarItem.to}
              title={t(hiddenSidebarItem.name)}
              tooltipText={t(hiddenSidebarItem.name)}
              icon={hiddenSidebarItem.icon}
              quantity={hiddenSidebarItem.quantity}
              isShowSidebar={isShowSidebar}
            />
          ))}
          <SidebarItem
            to="/settings"
            title={t('manage_label')}
            tooltipText={t('manage_label')}
            icon={<RiSettings3Line size={18} />}
            isShowSidebar={isShowSidebar}
          />
        </SidebarGroup>
        <SidebarGroup title={t('category')} isShowSidebar={isShowSidebar}>
          {categoryItemDisplay.map((category) => (
            <SidebarItem
              key={category.id}
              to={category.to}
              title={t(category.name)}
              tooltipText={t(category.name)}
              icon={category.icon}
              quantity={category.quantity}
              isShowSidebar={isShowSidebar}
            />
          ))}
        </SidebarGroup>
        <ButtonAddLabel isShowSidebar={isShowSidebar} />
        <LabelManagement />
      </div>
    </div>
  );
};
export default Sidebar;
