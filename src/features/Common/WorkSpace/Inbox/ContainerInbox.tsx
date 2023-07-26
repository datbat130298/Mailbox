import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getInbox } from '../../../../app/Services/Inbox/InboxService';
import { MailType } from '../../../../app/Types/commonTypes';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerInbox = () => {
  const [inboxData, setInboxData] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getInbox()
      .then((data: Array<MailType>) => {
        setInboxData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.document.title = `${t('inbox')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer isLoading={isLoading} mailData={inboxData} />
    </div>
  );
};
export default ContainerInbox;
