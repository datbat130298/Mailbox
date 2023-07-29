import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
import Tooltip from '../Tooltip/Tooltip';
import AddLabelsModal from './AddLabelsModal';

interface ButtonAddLabelProp {
  isShowSidebar: boolean;
}

const ButtonAddLabel = ({ isShowSidebar }: ButtonAddLabelProp) => {
  const [isShowAddLabel, setIsShowAddLabel] = useState<boolean>(false);
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);
  const { t } = useTranslation();

  const handleClickAdd = () => {
    setIsShowAddLabel(true);
  };

  const handleCloseModal = () => {
    setIsShowAddLabel(false);
  };

  return (
    <Tooltip position="left" title={t('add_label')}>
      <div
        className={twMerge(
          'flex  items-center justify-between rounded-r-full ',
          (isShowSidebar || isShowFullSidebar) && 'w-[240px]',
        )}
        style={{ transition: '.4s', transitionDelay: '.05s' }}
      >
        {(isShowFullSidebar || isShowSidebar) && (
          <div className="">
            <div className="pl-9 text-base font-semibold text-gray-700 duration-300">Labels</div>
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          onClick={handleClickAdd}
          className={twMerge(
            'rounded-full p-2 text-gray-700 hover:bg-slate-200',
            !isShowSidebar && 'ml-[23px]',
            isShowFullSidebar && 'mr-0.5',
          )}
        >
          <MdAdd size={22} />
        </div>
      </div>
      <AddLabelsModal isOpen={isShowAddLabel} onClose={handleCloseModal} title={t('new_label')} />
    </Tooltip>
  );
};

export default ButtonAddLabel;
