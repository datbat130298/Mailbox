import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineEdit } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import ContextDraft from '../../../../app/Context/Context';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import useSelector from '../../../Hooks/useSelector';
import Button from '../Button';
import ListOfMiniatureDrafts from '../ListOfMiniatureDrafts/ListOfMiniatureDrafts';

interface ComposeButtonProp {
  isShowSidebar: boolean;
}

const ComposeButton = ({ isShowSidebar }: ComposeButtonProp) => {
  const { t } = useTranslation();
  const [isShowComposePopupList, setIsShowComposePopupList] = useState<boolean>(true);
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const { handleAddComposeDraft } = useContext(ContextDraft);

  const handleClickCompose = () => {
    handleAddComposeDraft(ComposeViewTypeEnum.POPUP);
    setIsShowComposePopupList(true);
    if (!localStorage.getItem('defaultFullScreen')) {
      localStorage.setItem('defaultFullScreen', 'false');
    }
  };

  return (
    <div className="">
      <Button
        className={twMerge(
          'mb-2 ml-3 h-13 w-10 border-0 bg-gray-300 text-gray-700 shadow-none ring-1 hover:bg-gray-300 hover:text-primary-700 hover:drop-shadow-md',
          (isShowFullSidebar || isShowSidebar) && 'h-13 w-40',
        )}
        color="light"
        onClick={handleClickCompose}
      >
        <div
          className={twMerge(
            'flex h-full justify-center transition-none',
            (isShowFullSidebar || isShowSidebar) && 'ml-1',
          )}
        >
          <MdOutlineEdit size={26} className="mt-[1px] leading-10" />
          {(isShowFullSidebar || isShowSidebar) && <div className="h-full w-max px-4">{t('compose')}</div>}
        </div>
      </Button>
      {isShowComposePopupList && <ListOfMiniatureDrafts />}
    </div>
  );
};
export default ComposeButton;
