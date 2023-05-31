import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TrashTable from './TrashTable';

const ContainerTrash = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.document.title = `${t('trash')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="relative h-full w-full rounded-t-lg">
      <TrashTable />
    </div>
  );
};
export default ContainerTrash;
