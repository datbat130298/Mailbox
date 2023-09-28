import React, { ForwardedRef } from 'react';
import { MailType } from '../../../../../../app/Types/commonTypes';
import ViewMailSpaceContainer from './ViewMailSpaceContainer';

interface ViewMailSpaceProp {
  handleClose: () => void;
  mailData: MailType | null;
  type: string;
  getDetailById?: (id: number) => void;
}

const ViewMailSpace = (
  { handleClose, mailData, type, getDetailById }: ViewMailSpaceProp,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <div className="flex h-full justify-start bg-slate-50 shadow-left">
      <div className="w-2 flex-shrink-0 hover:cursor-col-resize" ref={ref}>
        {/* <div className="h-14 w-full border-b-[0.5px]" /> */}
      </div>
      <div className="h-full flex-1">
        {/* <ViewMailSpaceHeader handleClose={handleClose} /> */}
        <ViewMailSpaceContainer
          mailData={mailData}
          type={type}
          getDetailById={getDetailById}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(ViewMailSpace);
