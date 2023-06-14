import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlinePencil } from 'react-icons/hi';
import ContextDraft from '../../../../app/Context/Context';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import Button from '../../Components/Button';
import ListOfMiniatureDrafts from '../../Components/ListOfMiniatureDrafts/ListOfMiniatureDrafts';

const SubSidebarInbox = () => {
  const { t } = useTranslation();
  const [isShowComposePopupList, setIsShowComposePopupList] = useState<boolean>(true);

  const { handleAddComposeDraft } = useContext(ContextDraft);

  const handleClickCompose = () => {
    handleAddComposeDraft(ComposeViewTypeEnum.POPUP);
    setIsShowComposePopupList(true);
    if (!localStorage.getItem('defaultFullScreen')) {
      localStorage.setItem('defaultFullScreen', 'false');
    }
  };

  return (
    <div className="h-full w-full">
      <Button
        className="h-10 w-full bg-gray-200 text-gray-700 shadow-none ring-1 hover:bg-gray-300 hover:text-primary-700"
        color="light"
        onClick={handleClickCompose}
      >
        <div className="flex h-full w-full justify-center">
          <HiOutlinePencil size={20} className="h-full w-fit leading-10" />
          <div className="h-full w-max px-4 leading-[15px]">{t('compose')}</div>
        </div>
      </Button>
      {isShowComposePopupList && <ListOfMiniatureDrafts />}
    </div>
  );
};
export default SubSidebarInbox;
