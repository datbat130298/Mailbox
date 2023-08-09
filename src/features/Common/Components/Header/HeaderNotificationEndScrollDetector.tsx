import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderNotificationEndScrollDetectorProp {
  isShown: boolean;
  onReach: () => void;
}

const HeaderNotificationEndScrollDetector = ({
  isShown,
  onReach,
}: HeaderNotificationEndScrollDetectorProp) => {
  const scrollDetectorRef = useRef(null);

  useEffect(() => {
    if (!scrollDetectorRef.current) return undefined;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onReach();
      }
    });

    observer.observe(scrollDetectorRef.current);

    return () => {
      if (scrollDetectorRef.current !== null) {
        observer.unobserve(scrollDetectorRef.current as unknown as Element);
      }
    };
  }, [onReach]);

  return (
    <div className={twMerge('m-3 flex items-center space-x-6', !isShown && 'hidden')} ref={scrollDetectorRef}>
      <div className="h-16 w-16 animate-pulse rounded-full bg-gray-100" />
      <div className="flex flex-1 flex-col space-y-4">
        <div className="h-4 w-full animate-pulse rounded-md bg-gray-100" />
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-gray-100" />
      </div>
    </div>
  );
};

export default HeaderNotificationEndScrollDetector;
