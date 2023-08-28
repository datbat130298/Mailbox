import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import {
  getInbox,
  // getConversationById,
  getListEmail,
} from '../../../../app/Services/ConversationService/ConversationService';
import { MailType } from '../../../../app/Types/commonTypes';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerInbox = () => {
  const [inboxData, setInboxData] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const fetchDataListEmail = useCallback(() => {
    setIsLoading(true);
    getListEmail()
      .then((res) => {
        setInboxData(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // fetchData();
    fetchDataListEmail();
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
      <MailTableContainer isLoading={isLoading} mailData={inboxData} type={TypeChat.INBOX} />
    </div>
  );
};
export default ContainerInbox;
