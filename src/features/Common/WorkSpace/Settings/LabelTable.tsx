import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { TbMail } from 'react-icons/tb';
import { updateLabelDisplay } from '../../../../app/Slices/labelSlice';
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
  icon: ReactElement;
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

  const valueCategory = [
    {
      id: 2,
      name: 'starred',
      icon: <TbMail size={22} />,
      display: [
        {
          hide: true,
        },
        {
          show: false,
        },
      ],
    },
    {
      id: 3,
      name: 'snoozed',
      icon: <TbMail size={22} />,
      display: [
        {
          hide: true,
        },
        {
          show: false,
        },
      ],
    },
    {
      id: 4,
      name: 'important',
      icon: <TbMail size={22} />,
      display: [
        {
          hide: true,
        },
        {
          show: false,
        },
        {
          showIfUnread: false,
        },
      ],
    },
  ];

  // const valueTest = [
  //   {
  //     id: 2,
  //     name: 'starred',
  //     icon: <TbMail size={22} />,
  //     display: [
  //       {
  //         hide: true,
  //       },
  //       {
  //         show: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: 'snoozed',
  //     icon: <TbMail size={22} />,
  //     display: [
  //       {
  //         hide: true,
  //       },
  //       {
  //         show: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: 'important',
  //     icon: <TbMail size={22} />,
  //     display: [
  //       {
  //         hide: true,
  //       },
  //       {
  //         show: false,
  //       },
  //       {
  //         showIfUnread: false,
  //       },
  //     ],
  //   },
  // ];

  const handleChangeLabel = (arr: ValueLabelTable[]) => {
    dispatch(updateLabelDisplay(arr));
  };

  const handleChangeCategory = (arr: ValueLabelTable[]) => {
    // eslint-disable-next-line no-console
    console.log(arr);
  };

  return (
    <>
      <div className="h-fit w-3/4 border-b border-gray-200 pb-2 pt-0.5">
        <Table titles={titleLabels} values={systemLabels} handleChange={handleChangeLabel} />
      </div>
      <div className="h-fit w-3/4 border-b border-gray-200 pb-2 pt-0.5">
        <Table titles={categorySystem} values={valueCategory} handleChange={handleChangeCategory} />
      </div>
    </>
  );
};

export default LabelTable;
