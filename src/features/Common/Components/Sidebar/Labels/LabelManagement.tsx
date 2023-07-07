import { useTranslation } from 'react-i18next';
import SidebarGroup from '../SidebarGroup';
import LabelGroup from './LabelGroup';

const LabelManagement = () => {
  const { t } = useTranslation();
  const arrayVisibleLabel = [
    {
      id: 1,
      label: 'label1',
      to: '/label1',
      children: [
        {
          id: 11,
          label: 'children11-label-1',
          to: '/children11-label-1',
        },
        {
          id: 21,
          label: 'children12-label-1',
          to: '/children12-label-1',
        },
      ],
    },
    {
      id: 2,
      label: 'label2',
      children: [],
      to: '/label2',
    },
    {
      id: 3,
      label: 'label3',
      children: [],
      to: '/label3',
    },
  ];

  const arrayHiddenLabel = [
    {
      id: 4,
      label: 'label4',
      children: [],
      to: '/label4',
    },
    {
      id: 5,
      label: 'label5',
      children: [],
      to: '/label5',
    },
  ];

  return (
    <div className="w-full ">
      {arrayVisibleLabel.map((item) => (
        <LabelGroup
          id={item.id}
          key={item.id}
          label={item.label}
          childrenLabel={item.children}
          to={item.to}
        />
      ))}

      <SidebarGroup title={t('more')}>
        {arrayHiddenLabel.map((labelItem) => (
          <LabelGroup
            id={labelItem.id}
            key={labelItem.id}
            label={labelItem.label}
            childrenLabel={labelItem.children}
            to={labelItem.to}
          />
        ))}
      </SidebarGroup>
    </div>
  );
};

export default LabelManagement;
