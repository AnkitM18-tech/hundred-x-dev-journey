import type { ReactElement } from "react";

const PrimaryButton = ({
  title,
  icon,
}: {
  title: string;
  icon?: ReactElement;
}) => {
  return (
    <>
      <button className="bg-tuna-50 text-tuna-950 px-4 py-2 rounded-md cursor-pointer flex gap-2 items-center">
        {icon}
        {title}
      </button>
    </>
  );
};

export default PrimaryButton;
