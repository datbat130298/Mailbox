import _ from 'lodash';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../app/Types/commonTypes';
import Checkbox from '../Form/Checkbox';
import MailItemAction from './MailItemAction';

interface MailItemProps {
  mail: MailType;
  onChangeSelectRows: (idRows: number, checked: boolean) => void;
  selected: boolean;
}

const MailItem = ({ mail, onChangeSelectRows, selected }: MailItemProps) => {
  return (
    <div className="group relative h-fit w-full" role="button" tabIndex={0}>
      <div
        className={twMerge(
          'flex h-13 w-full overflow-hidden border-b-[0.5px] px-2 text-sm group-hover:bg-gray-100',
          selected && 'bg-gray-100',
        )}
      >
        <div className="my-2.5 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100">
          <div className="flex-center h-full w-max ">
            <Checkbox checked={selected} onChange={(e) => onChangeSelectRows(mail.uuid, e.target.checked)} />
          </div>
        </div>
        <div className="h-full w-[calc(100%-48px)] pl-2">
          <div className="flex h-full w-full justify-start overflow-hidden text-gray-700">
            <div className="line-clamp-1 flex h-full w-56 flex-shrink-0  text-ellipsis break-all font-semibold leading-[52px] text-gray-700">
              {mail?.author}
            </div>
            <div className="line-clamp-1  flex h-full w-fit flex-shrink-0 font-semibold leading-[52px]">
              {mail?.subject}
            </div>
            <div className="line-clamp-1  h-full w-fit text-ellipsis break-all pl-1 leading-[52px]">
              {!_.isEmpty(mail?.content) && `- ${mail?.content}`}
            </div>
          </div>
        </div>
      </div>
      <MailItemAction />
    </div>
  );
};
export default MailItem;
