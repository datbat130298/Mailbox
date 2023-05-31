import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlinePencil } from 'react-icons/hi';
import Button from '../../Components/Button';
import Compose from '../../Components/Compose/Compose';

const SubSidebarInbox = () => {
  const [isShowCompose, setIsShowCompose] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleClickCompose = () => {
    setIsShowCompose(true);
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
      <Compose isOpen={isShowCompose} setOpen={setIsShowCompose} />
    </div>
  );
};
export default SubSidebarInbox;
