import { Button } from "@/components/Atoms";
import { FC } from "react";

export interface ICardLecturerInClassProps {}

export const CardLecturerInClass: FC<ICardLecturerInClassProps> = () => {
  return (
    <>
      <h3 className="text-md uppercase">Thesis graduation - CT550</h3>
      <h4 className="text-[26px] font-semibold uppercase">Le Huynh Quoc Bao</h4>
      <h5 className="font-medium text-green-700">
        Major: Sercurity Information
      </h5>
      <ul>
        <li className="text-base flex gap-2">
          <span className="">lhqbao@ctu.edu.vn</span>
        </li>
        <li className="text-base flex gap-2">
          <span className="">0953812461</span>
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
