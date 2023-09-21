import { useTranslation } from 'react-i18next';
import { updateCategoryLabelDisplay, updateLabelSystemDisplay } from '../../../../app/Slices/labelSlice';
import useDispatch from '../../../Hooks/useDispatch';
import useSelector from '../../../Hooks/useSelector';
import Table from './Table';

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

  const { labelSystem: systemLabels } = useSelector((state) => state.labelSidebar);

  const { categoryLabel } = useSelector((state) => state.labelSidebar);

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

  const categorySystem = [
    {
      id: 1,
      title: t('category'),
    },
    {
      id: 2,
      title: t('show_in_label_list'),
    },
  ];

  const handleChangeLabel = (arr: ValueLabelTable[]) => {
    dispatch(updateLabelSystemDisplay(arr));
  };

  const handleChangeCategory = (arr: ValueLabelTable[]) => {
    dispatch(updateCategoryLabelDisplay(arr));
  };

  return (
    <>
      <div className="h-fit w-3/4 border-b border-gray-200 pb-2 pt-0.5">
        <Table titles={titleLabels} values={systemLabels} handleChange={handleChangeLabel} />
      </div>
      <div className="h-fit w-3/4 border-b border-gray-200 pb-2 pt-0.5">
        <Table titles={categorySystem} values={categoryLabel} handleChange={handleChangeCategory} />
      </div>
    </>
  );
};

export default LabelTable;
