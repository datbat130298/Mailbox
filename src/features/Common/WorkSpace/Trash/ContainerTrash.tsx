import { useEffect } from 'react';
import TrashTable from './TrashTable';

const ContainerTrash = () => {
  useEffect(() => {
    window.document.title = `Trash - ${process.env.REACT_APP_WEBSITE_NAME}`;
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
