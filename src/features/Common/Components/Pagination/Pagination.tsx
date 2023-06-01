import { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

interface PaginationProps {
  onClickNextButton: () => boolean;
  onClickPrevButton: () => boolean;
  isHiddenRange: boolean;
}

const Pagination = ({ isHiddenRange, onClickNextButton, onClickPrevButton }: PaginationProps) => {
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  return (
    <div className="flex h-full w-fit text-gray-700">
      {!isHiddenRange && (
        <div className="flex-center my-3 flex h-8 w-max rounded-md p-2 text-sm hover:bg-gray-100">
          View 1-50 of 200
        </div>
      )}
      <div className="my-3 flex h-8 w-fit rounded-md">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            const prevButton = onClickPrevButton();
            if (prevButton === false) {
              setDisablePrev(true);
            } else {
              setDisableNext(false);
            }
          }}
          className={twMerge(
            'flex-center h-8 w-8  rounded-full hover:bg-gray-100 hover:text-primary-700',
            disablePrev && 'text-gray-300 hover:bg-white hover:text-gray-300',
          )}
        >
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            const nextButton = onClickNextButton();
            if (nextButton === false) {
              setDisableNext(true);
            } else {
              setDisablePrev(false);
            }
          }}
          className={twMerge(
            'flex-center h-8 w-8  rounded-full hover:bg-gray-100 hover:text-primary-700',
            disableNext && 'text-gray-300 hover:bg-white hover:text-gray-300',
          )}
        >
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
