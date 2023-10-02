import { Button } from "@/components/Atoms";
import { FC } from "react";

export interface ICriticalTaskProps {}

export const CriticalTask: FC<ICriticalTaskProps> = () => {
  return (
    <div className="h-fit p-5 border shadow-xl">
      <h2 className="uppercase text-md font-normal mb-2">Critical tasks</h2>
      <p className="text-red-600 text-sm mb-2">Deadline 28, August 2023</p>
      <p className="font-medium text-md uppercase">report progress thesis</p>
      <div className="flex justify-start">
        <Button
          className="btn rounded-none bg-transparent p-0 hover:bg-transparent border-none capitalize font-normal"
          title="View detail"
        />
      </div>
    </div>
  );
};
