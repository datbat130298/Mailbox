import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InboxTable from './InboxTable';

const ContainerInbox = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.document.title = `${t('inbox')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="relative h-full w-full rounded-t-lg">
      <InboxTable />
    </div>
  );
};
export default ContainerInbox;
