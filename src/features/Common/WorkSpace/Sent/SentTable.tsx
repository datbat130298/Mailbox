import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSents } from '../../../../app/Services/Sent/SentService';
import { MailType } from '../../../../app/Types/commonTypes';
import HeaderMailTable from '../../Components/Mail/HeaderMailTable';
import MailTable from '../../Components/Mail/MailTable';
import ViewMailSpace from '../../Components/Mail/ViewMailSpace';

const SentTable = () => {
  const [sentData, setSentData] = useState<Array<MailType>>([]);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);
  const [isShowViewMailSpace, setIsShowViewMailSpace] = useState(false);
  const [selectedMail, setSelectedMail] = useState({} as MailType);

  const isChecked = useMemo(() => {
    if (!_.isEmpty(selectRows)) return true;
    return false;
  }, [selectRows]);

  const fetchData = useCallback(() => {
    getSents().then((data: Array<MailType>) => {
      setSentData(data);
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
          onChangeShowShadow={setIsShowShadow}
          onClickShowMail={handleSelectMail}
          onChangeSelectRows={handleSelectRows}
          selectRows={selectRows}
        />
      )}
      {isShowViewMailSpace && <ViewMailSpace mail={selectedMail} />}
    </div>
  );
};
export default SentTable;
