import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { FiChevronDown, FiFilter } from 'react-icons/fi';
import { IoArchiveOutline } from 'react-icons/io5';
import { MdOutlineMoreVert } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { getInboxs } from '../../../../app/Services/Inbox/InboxService';
import { MailType } from '../../../../app/Types/commonTypes';
import Checkbox from '../../Components/Form/Checkbox';
import MailTable from '../../Components/Mail/MailTable';
import Pagination from '../../Components/Pagination/Pagination';
import SelectViewStyle from '../../Components/SelectViewStyle/SelectViewStyle';

const InboxTable = () => {
  const [inboxData, setInboxData] = useState<Array<MailType>>([]);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);

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

  return (
    <div className="relative h-full w-full pt-14">
      <div
        className={twMerge(
          'absolute left-0 top-0 z-40 flex h-14 w-full justify-between rounded-t-lg px-2 text-gray-500 ',
          isShowShadow ? 'shadow-bottom' : 'border-b-[0.5px]',
        )}
      >
        <div className="flex h-full w-fit">
          <div className="group my-3 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100">
            <div className="flex-center h-full w-max">
              <Checkbox
                checked={!_.isEmpty(selectRows)}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="group-hover:border-primary-700 group-hover:text-primary-700 "
              />
            </div>
            <div className="flex-center ml-1 h-full w-max hover:text-primary-700  group-hover:text-primary-700">
              <FiChevronDown size={14} />
            </div>
          </div>
          <div className="my-3 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <FiFilter size={14} />
            </div>
            <div className="ml-1 text-sm leading-8">Views</div>
          </div>
          <div className="my-3 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <MdOutlineMoreVert size={18} />
            </div>
            <div className="text-sm leading-8">More</div>
          </div>
          {!_.isEmpty(selectRows) && (
            <>
              <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
                <div className="flex-center h-full w-max">
                  <IoArchiveOutline size={14} />
                </div>
                <div className="ml-1 text-sm leading-8">Archive</div>
              </div>
              <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
                <div className="flex-center h-full w-max">
                  <BsTrash size={14} />
                </div>
                <div className="ml-1 text-sm leading-8">Delete</div>
              </div>
            </>
          )}
        </div>
        <div className="flex h-full w-fit">
          <Pagination />
          <SelectViewStyle />
        </div>
      </div>
      <MailTable
        data={inboxData}
        onChangeShowShadow={setIsShowShadow}
        onChangeSelectRows={handleSelectRows}
        selectRows={selectRows}
      />
    </div>
  );
};
export default InboxTable;
