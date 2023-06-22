import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

  const handleClickTab = (id: number) => {
    setSelectTab(id);
  };

  return (
    <div className="relative flex h-full w-full flex-col rounded-t-lg">
      <HeaderSetting selectTab={selectTab} handleClickTab={handleClickTab} tab={tab} />
      <div className="m-5 mt-0">{selectTab === 2 && <LabelTable />}</div>
    </div>
  );
};

export default SettingsManagement;
