import { useEffect } from 'react';
import DraftsTable from './DraftsTable';

const ContainerDrafts = () => {
  useEffect(() => {
    window.document.title = `Drafts - ${process.env.REACT_APP_WEBSITE_NAME}`;
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
