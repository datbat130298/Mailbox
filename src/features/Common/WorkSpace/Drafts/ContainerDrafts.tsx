import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDrafts } from '../../../../app/Services/Drafts/DraftsService';
import { MailType } from '../../../../app/Types/commonTypes';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerDrafts = () => {
  const [draftData, setDraftData] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getDrafts()
      .then((data: Array<MailType>) => {
        setDraftData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.document.title = `${t('drafts')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer isLoading={isLoading} mailData={draftData} />
    </div>
  );
};
export default ContainerDrafts;
