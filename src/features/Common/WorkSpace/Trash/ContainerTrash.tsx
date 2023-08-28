import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { getTrash } from '../../../../app/Services/Trash/TrashService';
import { MailType } from '../../../../app/Types/commonTypes';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerTrash = () => {
  const [trashData, setTrashData] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getTrash()
      .then((data: Array<MailType>) => {
        setTrashData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.document.title = `${t('trash')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer isLoading={isLoading} mailData={trashData} type={TypeChat.TRASH} />
    </div>
  );
};
export default ContainerTrash;
