import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSents } from '../../../../app/Services/Sent/SentService';
import { MailType } from '../../../../app/Types/commonTypes';
import EmptyData from '../../Components/EmptyData/EmptyData';
import HeaderMailTable from '../../Components/Mail/HeaderMailTable';
import MailTable from '../../Components/Mail/MailTable';
import ViewMailSpace from '../../Components/Mail/ViewMailSpace';

const SentTable = () => {
  const [sentData, setSentData] = useState<Array<MailType>>([]);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);
  const [isShowViewMailSpace, setIsShowViewMailSpace] = useState(false);
  const [selectedMail, setSelectedMail] = useState({} as MailType);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const isChecked = useMemo(() => {
    if (!_.isEmpty(selectRows)) return true;
    return false;
  }, [selectRows]);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getSents()
      .then((data: Array<MailType>) => {
        setSentData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectRows = (idRows: number, checked: boolean) => {
    if (checked) {
      return setSelectRows((prev) => _.uniq([...prev, idRows]));
    }
    return setSelectRows((prev) => prev.filter((item) => item !== idRows));
  };

  const handleSelectAll = (checked: boolean) => {
    const selectAll = sentData.map((item) => item?.uuid);
    if (checked) {
      return setSelectRows(selectAll);
    }
    return setSelectRows([]);
  };

  const handleSelectMail = (e: MailType) => {
    setSelectedMail(e);
    setIsShowViewMailSpace(true);
  };

  return (
    <div className="relative h-full w-full pt-14">
      <HeaderMailTable
        actionArray={['datetime']}
        isShowShadow={isShowShadow}
        isShowCheckboxHeader={isShowViewMailSpace}
        isChecked={isChecked}
        onClickSelectAll={handleSelectAll}
        onCloseViewMailSpace={() => {
          setIsShowViewMailSpace(false);
          setSelectedMail({} as MailType);
        }}
      />
      {!isShowViewMailSpace && (
        <MailTable
          data={sentData}
          isLoading={isLoading}
          onChangeShowShadow={setIsShowShadow}
          onClickShowMail={handleSelectMail}
          onChangeSelectRows={handleSelectRows}
          selectRows={selectRows}
          emptyComponent={
            <EmptyData message={t('sent_empty_message')} desription={t('sent_empty_description')} />
          }
        />
      )}
      {isShowViewMailSpace && <ViewMailSpace mail={selectedMail} />}
    </div>
  );
};
export default SentTable;
