import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import React, { forwardRef, Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { RiSettings3Line } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import logoText from '../../../../../assets/image/logo_text.png';
import useSelector from '../../../../Hooks/useSelector';
import { DisplayLabel } from '../../../WorkSpace/Settings/LabelTable';
import SidebarGroup from '../SidebarGroup';
import SidebarItem from '../SidebarItem';

interface SidebarResponsiveProp {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const SidebarResponsive = (
  { isOpen, className, onClose }: SidebarResponsiveProp,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { t } = useTranslation();
  const [, setValueSearch] = useState('');

  const { labelSystem } = useSelector((state) => state.labelSidebar);
  const { categoryLabel } = useSelector((state) => state.labelSidebar);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

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

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        ref={ref}
        open={isOpen}
        as="div"
        className={twMerge(className, 'fixed inset-0 z-[70] flex justify-start overflow-y-auto')}
        onClose={onClose}
        data-is-overlay="true"
      >
        <div className="left-0 ml-0 flex max-h-full">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="z-20 h-full w-[270px] bg-white">
              <div className="mt-3 flex h-10 w-full justify-between pl-4 pr-2">
                <div className="flex h-full w-fit flex-shrink-0 items-center justify-start pl-0 lg:w-72 lg:pl-4">
                  <img className="h-6 max-w-[120px] lg:h-[28px] lg:w-[120px]" src={logoText} alt="Workflow" />
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 active:bg-gray-200"
                  role="button"
                  tabIndex={0}
                  onClick={onClose}
                >
                  <IoClose size={22} />
                </div>
              </div>
              {/* Search  */}
              <input
                className="ml-4 mt-3 block h-10 w-[233px] rounded-md border border-gray-200 bg-slate-50 px-4 shadow-lg outline-slate-50 md:hidden"
                placeholder="Search"
                onChange={handleChangeInput}
              />
              <div className="overflow-hidden px-1 py-6 pr-3 hover:overflow-y-auto">
                {visibleSide &&
                  visibleSide.map((visibleSideItem) => (
                    <SidebarItem
                      onCloseMobile={onClose}
                      key={visibleSideItem.id}
                      to={visibleSideItem.to}
                      title={t(visibleSideItem.name)}
                      tooltipText={t(visibleSideItem.name)}
                      icon={visibleSideItem.icon}
                      quantity={visibleSideItem.quantity}
                      isShowSidebar
                    />
                  ))}

                <SidebarGroup title={t('more')} isShowSidebar>
                  {hiddenSidebar.map((hiddenSidebarItem) => (
                    <SidebarItem
                      onCloseMobile={onClose}
                      key={hiddenSidebarItem.id}
                      to={hiddenSidebarItem.to}
                      title={t(hiddenSidebarItem.name)}
                      tooltipText={t(hiddenSidebarItem.name)}
                      icon={hiddenSidebarItem.icon}
                      quantity={hiddenSidebarItem.quantity}
                      isShowSidebar
                    />
                  ))}
                  <SidebarItem
                    to="/settings"
                    title={t('manage_label')}
                    tooltipText={t('manage_label')}
                    icon={<RiSettings3Line size={18} />}
                    isShowSidebar
                  />
                </SidebarGroup>
                <SidebarGroup title={t('category')} isShowSidebar>
                  {categoryItemDisplay.map((category) => (
                    <SidebarItem
                      onCloseMobile={onClose}
                      key={category.id}
                      to={category.to}
                      title={t(category.name)}
                      tooltipText={t(category.name)}
                      icon={category.icon}
                      quantity={category.quantity}
                      isShowSidebar
                    />
                  ))}
                </SidebarGroup>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default forwardRef(SidebarResponsive);
