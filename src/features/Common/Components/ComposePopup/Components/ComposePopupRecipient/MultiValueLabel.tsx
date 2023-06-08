/* eslint-disable react/destructuring-assignment */
import { components, MultiValueGenericProps } from 'react-select';
import { OptionLabel } from './ComposePopupSelectRecipients';

const MultiValueLabel = (props: MultiValueGenericProps<OptionLabel>) => {
  return (
    <components.MultiValueLabel {...props}>
      <div className="p-0">
        <div className="flex h-max items-center gap-1 rounded-full text-slate-600 hover:text-black">
          <div className="h-6 w-6 overflow-hidden rounded-full">
            <img src={props.data.avatar} alt="d" className="h-full w-full object-cover object-center" />
          </div>
          <span className="mx-2 text-sm font-medium">{props.data.label}</span>
        </div>
      </div>
    </components.MultiValueLabel>
  );
};

export default MultiValueLabel;
