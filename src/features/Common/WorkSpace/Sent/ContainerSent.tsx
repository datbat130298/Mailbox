import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { getSent } from '../../../../app/Services/Sent/SentService';
import { MailType } from '../../../../app/Types/commonTypes';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerSent = () => {
  const [sentMailData, setSendMailData] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getSent()
      .then((data: Array<MailType>) => {
        setSendMailData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.document.title = `${t('sent')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer isLoading={isLoading} mailData={sentMailData} type={TypeChat.SENT} />
    </div>
  );
};
export default ContainerSent;
