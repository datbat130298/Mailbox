import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import ViewMailSpaceButtonFooterItem from './ViewMailSpaceButtonFooterItem';

interface ViewMailSpaceGroupButtonFooterProp {
  onClickReply: () => void;
  onClickForward: () => void;
  isShowComposeReplyOrForward: boolean;
}

const ViewMailSpaceGroupButtonFooter = ({
  onClickReply,
  onClickForward,
  isShowComposeReplyOrForward,
}: ViewMailSpaceGroupButtonFooterProp) => {
  const { t } = useTranslation();

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('click');
  };

  return (
    <div
      className={twMerge(
        ' mx-[22px] flex h-12 items-center justify-start gap-2 text-blue-600',
        isShowComposeReplyOrForward && 'border-b-[0.5px]',
      )}
    >
      <ViewMailSpaceButtonFooterItem onClick={onClickReply} className="-ml-2" title={t('reply')} />
      <ViewMailSpaceButtonFooterItem onClick={handleClick} title={t('reply_all')} />
      <ViewMailSpaceButtonFooterItem onClick={onClickForward} title={t('forward')} />
      <ViewMailSpaceButtonFooterItem onClick={handleClick} title={t('edit_as_new')} />
      <ViewMailSpaceButtonFooterItem onClick={handleClick} title={t('share_email')} />
    </div>
  );
};

export default ViewMailSpaceGroupButtonFooter;
