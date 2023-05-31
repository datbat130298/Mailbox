import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getInboxs } from '../../../../app/Services/Inbox/InboxService';
import { MailType } from '../../../../app/Types/commonTypes';
import EmptyData from '../../Components/EmptyData/EmptyData';
import HeaderMailTable from '../../Components/Mail/HeaderMailTable';
import MailTable from '../../Components/Mail/MailTable';
import ViewMailSpace from '../../Components/Mail/ViewMailSpace';

const InboxTable = () => {
  const [inboxData, setInboxData] = useState<Array<MailType>>([]);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);
  const [isShowViewMailSpace, setIsShowViewMailSpace] = useState(false);
  const [selectedMail, setSelectedMail] = useState({} as MailType);
  const [isLoading, setIsLoading] = useState(false);

  const isChecked = useMemo(() => {
    if (!_.isEmpty(selectRows)) return true;
    return false;
  }, [selectRows]);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getInboxs()
      .then((data: Array<MailType>) => {
        setInboxData(data);
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
        actionArray={['view', 'datetime']}
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
          isLoading={isLoading}
          onChangeShowShadow={setIsShowShadow}
          onChangeSelectRows={handleSelectRows}
          onClickShowMail={handleSelectMail}
          selectRows={selectRows}
          emptyComponent={
            <EmptyData
              message={"You don't have any saved inbox."}
              desription="You can click to compose button to create new mail."
            />
          }
        />
      )}
      {isShowViewMailSpace && <ViewMailSpace mail={selectedMail} />}
    </div>
  );
};
export default InboxTable;
