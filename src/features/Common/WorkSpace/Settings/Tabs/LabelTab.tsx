import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateLabelSystemDisplay } from '../../../../../app/Slices/labelSlice';
import useDispatch from '../../../../Hooks/useDispatch';
import useSelector from '../../../../Hooks/useSelector';
import Table from '../Table';

export interface DisplayLabel {
  hide?: boolean;
  show?: boolean;
  showIfUnread?: boolean;
}
export interface ValueLabelTable {
  id: number;
  to?: string;
  name: string;
  categoryLabelItem?: ValueLabelTable[];
  display: DisplayLabel[] | [];
  quantity?: number;
}

export interface TitleLabelTable {
  id: number;
  title: string;
}

const LabelTable = () => {
  const { t } = useTranslation();
  const [labelData, setLabelData] = useState<ValueLabelTable[]>([]);

  const { labelSystem: systemLabels } = useSelector((state) => state.labelSidebar);

  useEffect(() => {
    setLabelData(systemLabels);
  }, [systemLabels]);

  const dispatch = useDispatch();

  const titleLabels = [
    {
      id: 1,
      title: t('system_label'),
    },
    {
      id: 2,
      title: t('show_in_label_list'),
    },
  ];

  const handleChangeLabel = (arr: ValueLabelTable[]) => {
    dispatch(updateLabelSystemDisplay(arr));
  };

  return (
    <div className="h-fit w-3/4 border-b border-gray-200 pb-2 pt-0.5">
      <Table titles={titleLabels} values={labelData} handleChange={handleChangeLabel} />
    </div>
  );
};

export default LabelTable;
