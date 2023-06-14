import _ from 'lodash';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CgMailForward, CgMailReply } from 'react-icons/cg';
import { MdOpenInNew } from 'react-icons/md';
import ContextDraft from '../../../../../app/Context/Context';
import { ComposeViewTypeEnum } from '../../../../../app/Enums/commonEnums';
import FilterDropdown from '../../FilterDropdown/FilterDropdown';
import Tooltip from '../../Tooltip/Tooltip';

interface ReplyAndForwardHeaderProps {
  type?: string;
  toEmail?: string;
  setComposeViewType?: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
}

const ReplyAndForwardHeader = ({ type, toEmail, setComposeViewType }: ReplyAndForwardHeaderProps) => {
  const { t } = useTranslation();
  const { handleAddComposeDraft } = useContext(ContextDraft);
  const replyAndForwardAction = [
    {
      uuid: 1,
      label: 'Reply',
      value: 'reply',
      onClick: () => _.isFunction(setComposeViewType) && setComposeViewType(ComposeViewTypeEnum.REPLY),
    },
    {
      uuid: 2,
      label: 'Forward',
      value: 'forward',
      onClick: () => _.isFunction(setComposeViewType) && setComposeViewType(ComposeViewTypeEnum.FORWARD),
    },
    {
      uuid: 3,
      label: 'Edit subject',
      value: 'edit_subject',
      onClick: () => _.isFunction(setComposeViewType) && setComposeViewType(ComposeViewTypeEnum.POPUP),
    },
  ];

  const handleClickChangeViewTypeToPopup = () => {
    handleAddComposeDraft(ComposeViewTypeEnum.POPUP);
    if (_.isFunction(setComposeViewType)) setComposeViewType(ComposeViewTypeEnum.POPUP);
  };

  return (
    <div className="flex h-8 w-full justify-between px-2 pt-1">
      <div className="flex h-fit w-full justify-start p-2">
        <FilterDropdown
          elementStyle={
            <div className="flex-center h-full w-max group-hover:text-primary-700">
              {type === ComposeViewTypeEnum.REPLY && <CgMailReply size={18} />}
              {type === ComposeViewTypeEnum.FORWARD && <CgMailForward size={18} />}
            </div>
          }
          data={replyAndForwardAction}
          position="left-0 top-8"
        />
        {type === ComposeViewTypeEnum.REPLY && (
          <div className="line-clamp-1 h-full w-5/6 text-ellipsis break-all pl-2 text-left text-sm leading-8 underline">
            {toEmail}
          </div>
        )}
        {type === ComposeViewTypeEnum.FORWARD && (
          <div className="line-clamp-1 h-full w-5/6 text-ellipsis break-all pl-2 text-left text-sm leading-8">
            To
          </div>
        )}
      </div>
      <Tooltip title={t('open_in_a_popup')} position="left">
        <div
          role="button"
          tabIndex={0}
          onClick={handleClickChangeViewTypeToPopup}
          className="mr-1 mt-2 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100 hover:text-primary-700"
        >
          <div className="flex-center h-full w-max">
            <MdOpenInNew size={16} />
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export default ReplyAndForwardHeader;
