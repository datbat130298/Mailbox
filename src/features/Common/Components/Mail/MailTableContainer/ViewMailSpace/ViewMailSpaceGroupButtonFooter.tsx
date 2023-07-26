import { useTranslation } from 'react-i18next';
import ViewMailSpaceButtonFooterItemProp from './ViewMailSpaceButtonFooterItem';

const ViewMailSpaceGroupButtonFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="ml-3 flex h-12 items-center justify-start gap-2 text-blue-600">
      <ViewMailSpaceButtonFooterItemProp title={t('reply')} />
      <ViewMailSpaceButtonFooterItemProp title={t('reply_all')} />
      <ViewMailSpaceButtonFooterItemProp title={t('forward')} />
      <ViewMailSpaceButtonFooterItemProp title={t('edit_as_new')} />
      <ViewMailSpaceButtonFooterItemProp title={t('share_email')} />
    </div>
  );
};

export default ViewMailSpaceGroupButtonFooter;
