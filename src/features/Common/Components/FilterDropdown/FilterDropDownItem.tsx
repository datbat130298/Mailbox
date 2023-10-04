import _ from 'lodash';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { FilterItemType } from './FilterDropdown';

interface FilterDropdownItemProp {
  item: FilterItemType;
  onClose: () => void;
  type?: TypeChat;
}

const FilterDropdownItem = ({ item, onClose, type }: FilterDropdownItemProp) => {
  const handleClickItem = () => {
    if (_.isFunction(item.onClick)) {
      item.onClick();
    }
    onClose();
  };
  return (
    <div
      className={twMerge(
        'flex h-8 min-w-max rounded-sm hover:bg-gray-200 hover:text-primary-700',
        item.value === 'mark_as_unread' && type !== TypeChat.INBOX && 'hidden',
      )}
      key={item.uuid}
      role="button"
      tabIndex={0}
      onClick={handleClickItem}
    >
      <div className="h-full w-full px-7 text-start text-sm leading-8">{item.label}</div>
    </div>
  );
};

export default FilterDropdownItem;
