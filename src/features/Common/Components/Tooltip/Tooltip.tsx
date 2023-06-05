import { PlacesType } from 'react-tooltip';

interface TooltipProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  position?: PlacesType | undefined;
}

const Tooltip = ({ children, className, title, position = 'bottom' }: TooltipProps) => {
  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={title}
      data-tooltip-place={position}
      data-tooltip-variant="dark"
      className={className}
    >
      {children}
    </div>
  );
};
export default Tooltip;
