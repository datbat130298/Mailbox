import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormAdd } from 'react-icons/gr';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
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
    <>
      <div
        className={twMerge(
          'flex  items-center justify-between rounded-r-full ',
          isShowSidebar && 'w-[255px]',
        )}
      >
        {(isShowFullSidebar || isShowSidebar) && (
          <div className="">
            <div className="pl-9 text-base font-semibold text-gray-700">Labels</div>
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          onClick={handleClickAdd}
          className={twMerge('rounded-full p-2 text-gray-500 hover:bg-slate-200', !isShowSidebar && 'pl-8')}
        >
          <GrFormAdd size={24} />
        </div>
      </div>
      <AddLabelsModal isOpen={isShowAddLabel} onClose={handleCloseModal} title={t('new_label')} />
    </>
  );
};

export default ButtonAddLabel;
