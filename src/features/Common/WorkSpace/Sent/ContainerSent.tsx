import { useEffect } from 'react';
import SentTable from './SentTable';

const ContainerSent = () => {
  useEffect(() => {
    window.document.title = `Sent - ${process.env.REACT_APP_WEBSITE_NAME}`;
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
