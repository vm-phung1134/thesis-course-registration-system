import { FC } from "react";

export interface IIConTitleProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export const IConTitle: FC<IIConTitleProps> = ({ className, title, children }) => {
  return (
    <div className="flex gap-3 items-center">
        {children}
      <p className={`${className}`}>{title}</p>
    </div>
  );
};
