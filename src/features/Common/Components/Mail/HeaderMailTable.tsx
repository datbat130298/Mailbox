import _ from 'lodash';
import { FiFilter } from 'react-icons/fi';
import { IoArrowBackOutline } from 'react-icons/io5';

import { twMerge } from 'tailwind-merge';
import { filterCheckboxData, filterViewData } from '../../../utils/helpers';
import FilterDatetime from '../../WorkSpace/Sent/FilterDatetime';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import Checkbox from '../Form/Checkbox';
import Pagination from '../Pagination/Pagination';
import SelectViewStyle from '../SelectViewStyle/SelectViewStyle';
import HeaderAction from './HeaderAction';

interface HeaderMailTableProps {
  actionArray: Array<string>;
  isShowShadow: boolean;
  isChecked: boolean;
  isShowCheckboxHeader: boolean;
  onClickSelectAll: (e: boolean) => void;
  onCloseViewMailSpace: () => void;
}

const HeaderMailTable = ({
  actionArray,
  isShowShadow,
  isChecked,
  isShowCheckboxHeader,
  onClickSelectAll,
  onCloseViewMailSpace,
}: HeaderMailTableProps) => {
  return (
    <div
      className={twMerge(
        'absolute left-0 top-0 z-40 flex h-14 w-full justify-between rounded-t-lg px-2 text-gray-500 ',
        isShowShadow ? 'shadow-bottom' : 'border-b-[0.5px]',
      )}
    >
      {!isShowCheckboxHeader && (
        <div className="flex h-full w-fit">
          <div className="group my-3 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100">
            <div className="flex-center h-full w-max">
              <Checkbox
                checked={isChecked}
                onChange={(e) => onClickSelectAll(e.target.checked)}
                className="group-hover:border-primary-700 group-hover:text-primary-700 "
              />
            </div>
            <FilterDropdown noneIcon data={filterCheckboxData} position="-left-6 top-10" />
          </div>
          {_.includes(actionArray, 'view') && (
            <FilterDropdown
              data={filterViewData}
              icon={<FiFilter size={14} />}
              label="View"
              position="left-0 top-[52px]"
            />
          )}
          {_.includes(actionArray, 'datetime') && <FilterDatetime />}
          <HeaderAction showAction={isChecked} />
        </div>
      )}
      {isShowCheckboxHeader && (
        <div className="flex justify-start">
          <div
            role="button"
            tabIndex={0}
            onClick={onCloseViewMailSpace}
            className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700"
          >
            <div className="flex-center h-full w-max">
              <IoArrowBackOutline size={14} />
            </div>
            <div className="ml-1 text-sm leading-8">Back</div>
          </div>
          <HeaderAction showAction={isShowCheckboxHeader} />
        </div>
      )}
      <div className="flex h-full w-fit">
        <Pagination />
        <SelectViewStyle />
      </div>
    </div>
  );
};

export default HeaderMailTable;
