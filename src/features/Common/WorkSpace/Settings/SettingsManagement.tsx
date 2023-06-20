import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValueTableLabelEnum } from '../../../../app/Enums/commonEnums';
import HeaderSetting from './HeaderSetting';
import LabelTable from './LabelTable';

const SettingsManagement = () => {
  const [selectTab, setSelectTab] = useState<number>(2);
  const { t } = useTranslation();

  const tab = [
    {
      id: 1,
      label: t('general'),
    },
    {
      id: 2,
      label: t('labels'),
    },
  ];

  const systemLabels = [
    {
      id: 1,
      title: t('system_label'),
    },
    {
      id: 2,
      title: t('show_in_label_list'),
    },
  ];

  const valueSystem = [
    {
      id: 1,
      name: t('inbox'),
    },
    {
      id: 2,
      name: t('starred'),
      value: ValueTableLabelEnum.HIDE,
      hide: true,
      show: false,
    },
    {
      id: 3,
      name: t('snoozed'),
      value: ValueTableLabelEnum.HIDE,
      hide: true,
      show: false,
    },
    {
      id: 4,
      name: t('important'),
      value: ValueTableLabelEnum.SHOW,
      hide: true,
      show: false,
    },
    {
      id: 5,
      name: t('chats'),
      value: ValueTableLabelEnum.SHOW,
      hide: true,
      show: false,
    },
    {
      id: 6,
      name: t('sent'),
      value: ValueTableLabelEnum.SHOW,
      hide: true,
      show: false,
    },
    {
      id: 7,
      name: t('spam'),
      value: ValueTableLabelEnum.SHOW,
      hide: true,
      show: false,
      showIfUnread: false,
    },
    {
      id: 8,
      name: t('trash'),
      value: ValueTableLabelEnum.SHOW,
      hide: true,
      show: false,
    },
    {
      id: 9,
      name: t('all_mail'),
      value: ValueTableLabelEnum.HIDE,
      hide: true,
      show: false,
      showIfUnread: false,
    },
  ];

  const handleClickTab = (id: number) => {
    setSelectTab(id);
  };

  return (
    <div className="relative flex h-full w-full flex-col rounded-t-lg">
      <HeaderSetting selectTab={selectTab} handleClickTab={handleClickTab} tab={tab} />
      <div className="m-5 mt-0">
        {selectTab === 2 && <LabelTable titles={systemLabels} values={valueSystem} />}
      </div>
    </div>
  );
};

export default SettingsManagement;
