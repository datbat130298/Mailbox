import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SentTable from './SentTable';

const ContainerSent = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.document.title = `${t('sent')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="relative h-full w-full rounded-t-lg">
      <SentTable />
    </div>
  );
};
export default ContainerSent;
