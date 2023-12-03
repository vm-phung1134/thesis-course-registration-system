import { ItemUserInfor } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import { convertToUnaccentedString } from "@/utils/convertString";
import { FC } from "react";

export interface IPersonalInforProps {
  member: IAuthObject;
}

export const PersonalInfor: FC<IPersonalInforProps> = ({ member }) => {
  return (
    <div className="rounded-xl p-5 mr-5 bg-slate-50 shadow-md">
      <h5 className="mb-5 font-medium capitalize text-green-700">
        Personal information
      </h5>
      <ul className="text-sm flex flex-col gap-3 text-black">
        <ItemUserInfor className="font-medium" title="ID Student" content={member?.name} />
        <ItemUserInfor title="Email" content={member?.email} />
        <div className="flex gap-10">
          <ItemUserInfor title="Phone" content={member?.phone} />
          <ItemUserInfor title="Class" content={member?.class} />
        </div>
        <ItemUserInfor title="Major" content={member?.major} />
      </ul>
    </div>
  );
};
