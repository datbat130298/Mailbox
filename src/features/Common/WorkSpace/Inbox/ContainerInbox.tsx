import { useEffect } from 'react';
import InboxTable from './InboxTable';

const ContainerInbox = () => {
  useEffect(() => {
    window.document.title = `Inbox - ${process.env.REACT_APP_WEBSITE_NAME}`;
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
