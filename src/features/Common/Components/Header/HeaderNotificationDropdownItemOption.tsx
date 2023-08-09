import { twMerge } from 'tailwind-merge';

interface HeaderNotificationDropdownItemOptionProp {
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
}

const HeaderNotificationDropdownItemOption = ({
  label,
  icon,
  onClick,
}: HeaderNotificationDropdownItemOptionProp) => {
  return (
    <div
      className={twMerge('flex items-center justify-start space-x-4 px-4 py-2 hover:bg-gray-100')}
      role="button"
      tabIndex={0}
      onMouseDown={onClick}
    >
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default HeaderNotificationDropdownItemOption;
