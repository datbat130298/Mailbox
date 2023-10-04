import React, { ForwardedRef } from 'react';
import { MailType } from '../../../../../../app/Types/commonTypes';
import ViewMailSpaceContainer from './ViewMailSpaceContainer';

interface ViewMailSpaceProp {
  handleClose: () => void;
  mailData: MailType | null;
  type: string;
  getDetailById?: (id: number) => void;
  onDeleteEmail?: (id: Array<number>) => void;
  onRemoveItem?: (id: number) => void;
}

const ViewMailSpace = (
  { handleClose, mailData, type, getDetailById, onDeleteEmail, onRemoveItem }: ViewMailSpaceProp,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <div className="flex h-full justify-start bg-gray-50 shadow-left">
      <div className="w-2 flex-shrink-0 hover:cursor-col-resize" ref={ref} />
      <div className="h-full flex-1">
        <ViewMailSpaceContainer
          onRemoveItem={onRemoveItem}
          onDeleteEmail={onDeleteEmail}
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
