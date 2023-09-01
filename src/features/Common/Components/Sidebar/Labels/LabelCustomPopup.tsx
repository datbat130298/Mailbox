import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { triggerClickOutside } from '../../../../utils/helpers';
import ColorPicker from './ColorPicker';
import LabelCustomPopupItem from './LabelCustomPopupItem';
import { LabelType } from './LabelManagement';

interface LabelCustomPopupProps {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  label: string;
  id: number;
  setColorPicker: Dispatch<SetStateAction<string>>;
  onRemove: (id: number) => void;
  onClickEdit: (data: LabelType) => void;
}

const LabelCustomPopup = ({
  setIsShow,
  label,
  id,
  setColorPicker,
  onRemove,
  onClickEdit,
}: LabelCustomPopupProps) => {
  const { t } = useTranslation();
  const labelCustomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    triggerClickOutside(labelCustomRef, () => {
      setIsShow(false);
    });
  }, [labelCustomRef]);

  const handleClickPopupItem = () => {
    // eslint-disable-next-line no-console
    console.log(1);
  };

  const handleClickRemove = () => {
    onRemove(id);
    setIsShow(false);
  };

  const handleClickRemoveColor = () => {
    setColorPicker('');
  };

  const handleClickEdit = () => {
    onClickEdit({ id, value: label, title: label, children: [] });
  };

  return (
    <div
      className="absolute -top-60 right-14 z-[51] w-44 overflow-hidden rounded-lg bg-white shadow-compose"
      ref={labelCustomRef}
      id={id.toString()}
    >
      <div className="flex items-center justify-center truncate border-b border-gray-200 py-2 font-medium capitalize">
        {label}
      </div>
      <div className="border-y border-gray-100 py-1.5">
        <p className="py-1 pl-4 text-sm font-medium text-slate-500">Color Picker</p>
        <ColorPicker setColorPicker={setColorPicker} />
        <LabelCustomPopupItem
          className="pl-[14px] text-slate-500"
          title={t('remove_color')}
          id={1}
          onClick={handleClickRemoveColor}
          isShowCheck={false}
        />
      </div>
      <div className="border-y border-gray-100 py-1.5 text-slate-500">
        <p className="py-1 pl-4 text-sm font-medium">In label list</p>
        <LabelCustomPopupItem title={t('show')} id={1} onClick={handleClickPopupItem} />
        <LabelCustomPopupItem title={t('show_if_unread')} id={2} onClick={handleClickPopupItem} />
        <LabelCustomPopupItem title={t('hide')} id={3} onClick={handleClickPopupItem} />
      </div>
      <div className="border-y border-gray-100 py-1.5 text-slate-500">
        <LabelCustomPopupItem title={t('edit')} id={1} onClick={handleClickEdit} />
        <LabelCustomPopupItem title={t('remove_label')} id={2} onClick={handleClickRemove} />
        <LabelCustomPopupItem title={t('add_label')} id={3} onClick={handleClickPopupItem} />
      </div>
    </div>
  );
};

export default LabelCustomPopup;
