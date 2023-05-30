import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoArchiveOutline } from 'react-icons/io5';
import { MdOutlineMoreVert } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { getSents } from '../../../../app/Services/Sent/SentService';
import { MailType } from '../../../../app/Types/commonTypes';
import Checkbox from '../../Components/Form/Checkbox';
import MailTable from '../../Components/Mail/MailTable';
import Pagination from '../../Components/Pagination/Pagination';
import SelectViewStyle from '../../Components/SelectViewStyle/SelectViewStyle';
import FilterDropdown from '../Inbox/FilterDropdown';
import FilterDatetime from './FilterDatetime';

const SentTable = () => {
  const [sentData, setSentData] = useState<Array<MailType>>([]);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);

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

  const filterCheckboxData = [
    {
      uuid: 1,
      label: 'All',
      value: 'all',
    },
    {
      uuid: 2,
      label: 'Unread',
      value: 'unread',
    },
    {
      uuid: 3,
      label: 'Read',
      value: 'read',
    },
  ];

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
            <FilterDropdown type="checkbox" filterByData={filterCheckboxData} position="-left-6 top-10" />
          </div>
          <FilterDatetime />
          <div className="my-3 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100 hover:text-primary-700">
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
        data={sentData}
        onChangeShowShadow={setIsShowShadow}
        onChangeSelectRows={handleSelectRows}
        selectRows={selectRows}
      />
    </div>
  );
};
export default SentTable;
