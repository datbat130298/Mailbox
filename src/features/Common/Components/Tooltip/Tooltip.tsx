interface TooltipProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}

const Tooltip = ({ children, className, title }: TooltipProps) => {
  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={title}
      data-tooltip-place="right"
      data-tooltip-variant="light"
      className={className}
    >
      {children}
    </div>
  );
};
export default Tooltip;
