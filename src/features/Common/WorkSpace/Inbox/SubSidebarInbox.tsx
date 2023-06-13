import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlinePencil } from 'react-icons/hi';
import { ComposeType } from '../../../../app/Types/commonTypes';
import Button from '../../Components/Button';
import ListOfMiniatureDrafts from '../../Components/ListOfMiniatureDrafts/ListOfMiniatureDrafts';

const SubSidebarInbox = () => {
  const { t } = useTranslation();
  const [isShowComposePopup, setIsShowComposePopup] = useState<boolean>(true);
  const [composeDraftList, setComposeDraftList] = useState<ComposeType[]>([]);

  const handleClickCompose = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // draft?.setDraft((prev: any) => prev?.concat({ isShow: true }));
    setComposeDraftList((prev) => prev.concat({ isShow: true, uuid: composeDraftList.length }));
    setIsShowComposePopup(true);
    if (!localStorage.getItem('defaultFullScreen')) {
      localStorage.setItem('defaultFullScreen', 'false');
    }
  };

  const handleShowCompose = useCallback(
    (id: number, data: boolean) => {
      const array = composeDraftList;
      array.forEach((item) => {
        if (item.uuid === id) {
          return Object.assign(item, { isShow: data });
        }
        return item;
      });
      setComposeDraftList(array);
    },
    [composeDraftList],
  );

  const handleClickCloseComposeItem = useCallback(
    (id: number) => {
      const array = composeDraftList;
      array.filter((item) => item.uuid !== id);
      setComposeDraftList(array);
    },
    [composeDraftList],
  );

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
      {isShowComposePopup && (
        <ListOfMiniatureDrafts
          handleClickCloseComposeItem={handleClickCloseComposeItem}
          handleShowCompose={handleShowCompose}
          setComposeDraftList={setComposeDraftList}
          composeDraftList={composeDraftList}
        />
      )}
    </div>
  );
};
export default SubSidebarInbox;
