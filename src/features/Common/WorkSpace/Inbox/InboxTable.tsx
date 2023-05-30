import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getInboxs } from '../../../../app/Services/Inbox/InboxService';
import { MailType } from '../../../../app/Types/commonTypes';
import HeaderMailTable from '../../Components/Mail/HeaderMailTable';
import MailTable from '../../Components/Mail/MailTable';
import ViewMailSpace from '../../Components/Mail/ViewMailSpace';

const InboxTable = () => {
  const [inboxData, setInboxData] = useState<Array<MailType>>([]);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);
  const [isShowViewMailSpace, setIsShowViewMailSpace] = useState(false);
  const [selectedMail, setSelectedMail] = useState({} as MailType);

  const isChecked = useMemo(() => {
    if (!_.isEmpty(selectRows)) return true;
    return false;
  }, [selectRows]);

  const fetchData = useCallback(() => {
    getInboxs().then((data: Array<MailType>) => {
      setInboxData(data);
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
    const selectAll = inboxData.map((item) => item?.uuid);
    if (checked) {
      return setSelectRows(selectAll);
    }
    return setSelectRows([]);
  };

  const handleSelectMail = (mail: MailType) => {
    setSelectedMail(mail);
    setIsShowViewMailSpace(true);
  };

  return (
    <div className="relative h-full w-full pt-14">
      <HeaderMailTable
        actionArray={['view']}
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
          data={inboxData}
          onChangeShowShadow={setIsShowShadow}
          onChangeSelectRows={handleSelectRows}
          onClickShowMail={handleSelectMail}
          selectRows={selectRows}
        />
      )}
      {isShowViewMailSpace && <ViewMailSpace mail={selectedMail} />}
    </div>
  );
};
export default InboxTable;
