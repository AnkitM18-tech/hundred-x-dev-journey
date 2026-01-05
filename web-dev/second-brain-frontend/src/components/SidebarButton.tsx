import type { ReactElement } from "react";

interface SidebarButtonProps {
  text: string;
  icon?: ReactElement;
  onClick: () => void;
}

const SidebarButton = ({ text, icon, onClick }: SidebarButtonProps) => {
  return (
    <li
      onClick={onClick}
      className="flex gap-2 items-center font-bold text-md md:text-lg justify-between mx-1 py-1 cursor-pointer hover:bg-tuna-200 hover:rounded-md hover:px-2 transition-all duration-100"
    >
      {icon} {text}
    </li>
  );
};

export default SidebarButton;
