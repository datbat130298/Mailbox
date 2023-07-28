import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import ViewMailSpaceButtonFooterItemProp from './ViewMailSpaceButtonFooterItem';

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
        'mx-3 flex h-12 items-center justify-start gap-2 text-blue-600',
        isShowComposeReplyOrForward && 'border-b-[0.5px]',
      )}
    >
      <ViewMailSpaceButtonFooterItemProp onClick={onClickReply} title={t('reply')} />
      <ViewMailSpaceButtonFooterItemProp onClick={handleClick} title={t('reply_all')} />
      <ViewMailSpaceButtonFooterItemProp onClick={onClickForward} title={t('forward')} />
      <ViewMailSpaceButtonFooterItemProp onClick={handleClick} title={t('edit_as_new')} />
      <ViewMailSpaceButtonFooterItemProp onClick={handleClick} title={t('share_email')} />
    </div>
  );
};

export default ViewMailSpaceGroupButtonFooter;
