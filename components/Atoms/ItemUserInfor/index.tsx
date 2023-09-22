import { FC } from "react";

export interface IItemUserInforProps {
  title: string;
  content: string | undefined;
  className?: string;
}

export const ItemUserInfor: FC<IItemUserInforProps> = ({
  title,
  content,
  className,
}) => {
  return (
    <li className="text-sm flex gap-2">
      <span>{`${title}: `}</span>
      <span className={`font-medium normal-case ${className}`}>{content || ""}</span>
    </li>
  );
};
