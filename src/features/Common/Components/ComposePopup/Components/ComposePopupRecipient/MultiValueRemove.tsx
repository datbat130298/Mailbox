import { IoClose } from 'react-icons/io5';
import { components, MultiValueRemoveProps } from 'react-select';
import { OptionLabel } from './ComposePopupSelectRecipients';

const MultiValueRemove = (props: MultiValueRemoveProps<OptionLabel>) => {
  return (
    <components.MultiValueRemove {...props}>
      <div className="" role="button" tabIndex={0}>
        <IoClose size={20} />
      </div>
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;
