import { FC } from "react";

export interface ICodeClassProps {
  code: string;
}

export const CodeClass: FC<ICodeClassProps> = ({ code }) => {
  return (
    <div className="border w-fit p-2">
      <div className="flex justify-between items-center">
        <small>Code</small>
        <button>...</button>
      </div>
      <p className="font-medium text-md px-5 py-2">{code}</p>
    </div>
  );
};
