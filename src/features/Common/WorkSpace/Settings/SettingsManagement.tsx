import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import HeaderSetting from './HeaderSetting';
import LabelTable from './Tabs/LabelTab';
import SignatureContainer from './Tabs/Signature/SignatureContainer';

const SettingsManagement = () => {
  const [selectTab, setSelectTab] = useState<number>(1);
  const param = useParams();
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
    {
      id: 3,
      label: t('signature'),
    },
  ];

  const handleClickTab = (id: number) => {
    setSelectTab(id);
  };

  useEffect(() => {
    setSelectTab(Number(param.idTag));
  }, [param.idTag]);

  return (
    <div className="relative flex h-full w-full flex-col rounded-t-lg">
      <HeaderSetting selectTab={selectTab} handleClickTab={handleClickTab} tab={tab} />
      <div className="m-5 mt-0">
        {selectTab === 2 && <LabelTable />}
        {selectTab === 3 && <SignatureContainer />}
      </div>
    </div>
  );
};

export default SettingsManagement;
