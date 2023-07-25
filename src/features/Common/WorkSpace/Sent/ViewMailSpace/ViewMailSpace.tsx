import { MailType } from '../../../../../app/Types/commonTypes';
import ViewMailSpaceContainer from './ViewMailSpaceContainer';
import ViewMailSpaceHeader from './ViewMailSpaceHeader';

interface ViewMailSpaceProp {
  handleClose: () => void;
  mailData: MailType | null;
}

const ViewMailSpace = ({ handleClose, mailData }: ViewMailSpaceProp) => {
  return (
    <div className="">
      <ViewMailSpaceHeader handleClose={handleClose} />
      <ViewMailSpaceContainer mailData={mailData} />
    </div>
  );
};

export default ViewMailSpace;
