import { FC } from "react";

export interface IItemUserInforProps {
  title: string;
  content: string;
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
      <span className={`font-medium capitalize ${className}`}>{content}</span>
    </li>
  );
};
