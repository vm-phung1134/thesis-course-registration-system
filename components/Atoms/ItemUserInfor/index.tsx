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
      <span className="text-gray-900">{`${title}: `}</span>
      <span className={`normal-case text-gray-600  ${className}`}>
        {content}
      </span>
    </li>
  );
};
