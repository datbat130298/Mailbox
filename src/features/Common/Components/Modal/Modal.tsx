import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import Button from '../Button';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isAllowSubmit?: boolean;
  isLoading?: boolean;
  contentContainerClassName?: string;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  subTitle?: string;
}

const Modal = (
  {
    subTitle,
    isOpen,
    isShowHeader = true,
    isShowFooter = true,
    isAllowSubmit = true,
    isLoading = false,
    title,
    children,
    className,
    contentContainerClassName,
    onClose,
    onConfirm,
  }: ModalProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const modalVariants = {
    hidden: {
      transform: 'scale(0.95)',
      opacity: 0,
      transition: {
        delay: 0.1,
      },
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      transform: 'scale(0.95)',
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {isOpen && (
        <Dialog
          ref={ref}
          open={isOpen}
          as="div"
          className={twMerge(className, 'fixed inset-0 z-[70] flex justify-center overflow-y-auto')}
          onClose={onClose}
          data-is-overlay="true"
        >
          <div className="my-auto flex max-h-full ">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0,
                delay: 0,
                ease: 'easeIn',
                times: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Dialog.Overlay className="fixed inset-0 z-0 bg-black bg-opacity-75 transition-opacity" />
            </motion.div>

            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <div className="relative z-20 w-full md:m-auto md:rounded-lg">
                <div className={twMerge('h-fit w-fit bg-white', isShowHeader && 'pt-7')}>
                  <div className="">
                    {isShowHeader && (
                      <div className={twMerge('mx-8 flex justify-between')}>
                        <div>
                          <div className="h-fit w-fit pb-2 text-lg font-semibold">{title}</div>
                          {subTitle && (
                            <div className="h-fit w-fit pb-2 text-base font-normal">{subTitle}</div>
                          )}
                          <div className="mt-2 h-1 w-16 rounded-md bg-gray-100" />
                        </div>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={onClose}
                          className="h-fit rounded-full border-2 border-gray-100 bg-gray-50 p-1 text-slate-700 hover:cursor-pointer hover:border-gray-200 hover:bg-gray-100"
                        >
                          <RiCloseFill size={15} />
                        </div>
                      </div>
                    )}
                    <div className={twMerge('w-[400px] pb-8 pt-8', contentContainerClassName)}>
                      {children}
                    </div>
                  </div>
                  {isShowFooter && (
                    <div className="flex items-center justify-end space-x-6 rounded-b-lg bg-gray-50 px-10 py-6">
                      <Button
                        className="rounded-md border-2 border-gray-200 shadow-none ring-0"
                        size="sm"
                        color="light"
                        disabled={isLoading}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                      <Button
                        className="rounded-md border-2 border-primary-700 px-12 shadow-none ring-0 disabled:border-gray-300"
                        size="sm"
                        disabled={isLoading || !isAllowSubmit}
                        isLoading={isLoading}
                        onClick={onConfirm}
                      >
                        Confirm
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default forwardRef(Modal);
