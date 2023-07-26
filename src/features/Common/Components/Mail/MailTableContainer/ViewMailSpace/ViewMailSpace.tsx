import React, { ForwardedRef } from 'react';
import { MailType } from '../../../../../../app/Types/commonTypes';
import ViewMailSpaceContainer from './ViewMailSpaceContainer';
import ViewMailSpaceHeader from './ViewMailSpaceHeader';

interface ViewMailSpaceProp {
  handleClose: () => void;
  mailData: MailType | null;
}

const ViewMailSpace = ({ handleClose, mailData }: ViewMailSpaceProp, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="flex h-full justify-start shadow-left">
      <div className="w-2 flex-shrink-0 hover:cursor-col-resize" ref={ref}>
        <div className="h-14 w-full border-b-[0.5px]" />
      </div>
      <div className="h-full flex-1">
        <ViewMailSpaceHeader handleClose={handleClose} />
        <ViewMailSpaceContainer mailData={mailData} />
      </div>
    </div>
  );
};

export default React.forwardRef(ViewMailSpace);
