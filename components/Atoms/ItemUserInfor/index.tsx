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
      <span className="text-gray-500">{`${title}: `}</span>
      <span className={`normal-case text-black ${className}`}>{content}</span>
    </li>
  );
};
