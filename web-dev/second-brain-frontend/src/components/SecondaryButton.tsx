import type { ReactElement } from "react";

const SecondaryButton = ({
  title,
  icon,
}: {
  title: string;
  icon?: ReactElement;
}) => {
  return (
    <button className="bg-tuna-700 px-4 py-2 rounded-md cursor-pointer text-tuna-50 flex gap-2 items-center">
      {icon}
      {title}
    </button>
  );
};

export default SecondaryButton;
