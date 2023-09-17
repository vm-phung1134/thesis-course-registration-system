import { FC } from "react";

export interface ICodeClassProps {}

export const CodeClass: FC<ICodeClassProps> = () => {
  return (
    <div className="border w-fit p-2">
      <div className="flex justify-between items-center">
        <small>Code</small>
        <button>...</button>
      </div>
      <p className="font-medium text-md px-5 py-2">zggbvj3</p>
    </div>
  );
};
