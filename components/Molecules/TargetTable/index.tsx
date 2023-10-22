import { Button } from "@/components/Atoms";
import { FC } from "react";

export interface ITargetTableProps {
  namePhase: string;
  children: React.ReactNode;
  listTarget?: [];
}

export const TargetTable: FC<ITargetTableProps> = ({ namePhase, children }) => {
  return (
    <div className="p-10 rounded-xl shadow-xl flex flex-col gap-3 justify-center items-center">
      <div className="border-2 rounded-full border-green-700">{children}</div>
      <p className="uppercase text-xl text-green-700 font-bold">{namePhase}</p>
      <p className="text-sm italic">Week 1 - Week 3</p>
      <p className="font-medium">The goal needs to be achieved at this phase:</p>
      <ul className="list-decimal font-thin text-sm">
        <li>Identify the sources of requirements</li>
        <li>Gather initial requirements</li>
        <li>Analyze requirements</li>
        <li>Validate requirements</li>
        <li>Document requirements</li>
        <li>Test and verify requirements</li>
        <li>Manage requirements</li>
      </ul>
      <Button className="w-full hover:bg-green-600 rounded-lg mt-5 bg-green-700 text-white" title="Get back report progress" />
    </div>
  );
};
