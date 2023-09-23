import { Button } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import { convertToUnaccentedString } from "@/utils/convertString";
import { FC } from "react";

export interface ICardLecturerInClassProps {
  lecturer: IAuthObject;
}

export const CardLecturerInClass: FC<ICardLecturerInClassProps> = ({
  lecturer,
}) => {
  return (
    <>
      <h3 className="text-md uppercase">Thesis graduation - CT550</h3>
      <h4 className="text-[26px] font-semibold uppercase">
        {convertToUnaccentedString(lecturer?.name)}
      </h4>
      <h5 className="font-medium text-green-700">
        Major: {lecturer?.major}
      </h5>
      <ul>
        <li className="text-base flex gap-2">
          <span className="">Email: {lecturer?.email}</span>
        </li>
        <li className="text-base flex gap-2">
          <span className="">Phone: {lecturer?.phone}</span>
        </li>
      </ul>
      <div className="flex justify-end items-end">
        <Button
          className="bg-transparent border-red-500 text-red-600 font-normal capitalize"
          title="Leave Group"
        />
      </div>
    </>
  );
};
