import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import React, { forwardRef, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { RiSettings3Line } from 'react-icons/ri';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getSettingLabel } from '../../../../../app/Services/Setting/Seting';
import { updateLabelSystemDisplay } from '../../../../../app/Slices/labelSlice';
import logoText from '../../../../../assets/image/logo_text.png';
import useDispatch from '../../../../Hooks/useDispatch';
import useNotify from '../../../../Hooks/useNotify';
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

  const dispatch = useDispatch();
  const toast = useNotify();
  const [searchValue, setValueSearch] = useState('');

  const { labelSystem } = useSelector((state) => state.labelSidebar);

  const fetchDataLabel = useCallback(() => {
    getSettingLabel()
      .then((res) => dispatch(updateLabelSystemDisplay(res.value)))
      .catch(() => toast.error('action_error'));
  }, []);

  useEffect(() => {
    fetchDataLabel();
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

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
  const navigate = useNavigate();

  const handleClickSearch = useCallback(() => {
    onClose();
    navigate({
      pathname: '/search',
      search: createSearchParams({
        from: searchValue,
        to: searchValue,
        search: searchValue,
        subject: searchValue,
        body: searchValue,
        // attachment: hasAttachmentChecked.toString(),
        type: 'all',
      }).toString(),
    });
  }, [searchValue]);

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      const { key } = e;
      if (key === 'Enter') {
        handleClickSearch();
      }
    },
    [searchValue],
  );

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
              <div className="ml-4 mt-3 flex h-10 w-[233px] items-center justify-between rounded-md border border-gray-200 bg-slate-50 px-4 shadow-lg outline-slate-50 md:hidden">
                <input
                  className="w-full flex-1 bg-inherit outline-none"
                  placeholder="Search"
                  onChange={handleChangeInput}
                  onKeyUp={handleKeyUp}
                />
                <div className="" role="button" tabIndex={0} onClick={handleClickSearch}>
                  <BiSearch size={22} className="text-gray-500" />
                </div>
              </div>
              <div className="overflow-hidden px-1 py-6 pr-3 hover:overflow-y-auto">
                {visibleSide &&
                  visibleSide.map((visibleSideItem) => (
                    <SidebarItem
                      onCloseMobile={onClose}
                      key={visibleSideItem.id}
                      to={visibleSideItem.to}
                      title={visibleSideItem.name}
                      tooltipText={t(visibleSideItem.name)}
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
                      title={hiddenSidebarItem.name}
                      tooltipText={t(hiddenSidebarItem.name)}
                      quantity={hiddenSidebarItem.quantity}
                      isShowSidebar
                    />
                  ))}
                  <SidebarItem
                    onCloseMobile={onClose}
                    to="/settings"
                    title="manage_label"
                    tooltipText={t('manage_label')}
                    icon={<RiSettings3Line size={18} />}
                    isShowSidebar
                  />
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
