import { useCallback, useEffect, useState } from 'react';
import { FiChevronDown, FiFilter } from 'react-icons/fi';
import { MdOutlineMoreVert } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { getInboxs } from '../../../../app/Services/Inbox/InboxService';
import Checkbox from '../../Components/Form/Checkbox';
import MailTable from '../../Components/Mail/MailTable';
import Pagination from '../../Components/Pagination/Pagination';

const InboxTable = () => {
  const [inboxData, setInboxData] = useState([]);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const fetchData = useCallback(() => {
    getInboxs().then((data: any) => {
      setInboxData(data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative h-full w-full pt-14">
      <div
        className={twMerge(
          'absolute left-0 top-0 z-10 flex h-14 w-full justify-between rounded-t-lg px-2 text-gray-500 ',
          isShowShadow ? 'shadow-bottom' : 'border-b-[0.5px]',
        )}
      >
        <div className="flex h-full w-fit">
          <div className="group my-3 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100">
            <div className="flex-center h-full w-max">
              <Checkbox className="group-hover:border-primary-700 group-hover:text-primary-700 " />
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
        </div>
        <Pagination />
      </div>
      <MailTable data={inboxData} onChangeShowShadow={setIsShowShadow} />
    </div>
  );
};
export default InboxTable;
