import { twMerge } from 'tailwind-merge';

interface LoadingSkeletonProps {
  className: string;
}

const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return <div className={twMerge('animate-pulse rounded-lg ', className)} />;
};
export default LoadingSkeleton;
