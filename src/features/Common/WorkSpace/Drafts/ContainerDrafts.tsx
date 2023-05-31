import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DraftsTable from './DraftsTable';

const ContainerDrafts = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.document.title = `${t('drafts')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="relative h-full w-full rounded-t-lg">
      <DraftsTable />
    </div>
  );
};
export default ContainerDrafts;
