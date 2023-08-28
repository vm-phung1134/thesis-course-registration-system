import { IconButton, LineUnder, TitleFormField } from "@/components/Atoms";
import { FC } from "react";

export interface ISocialLoginProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
}

export const SocialLogin: FC<ISocialLoginProps> = ({
  toggleForm,
  setToggleForm,
}) => {
  return (
    <div className="flex flex-col mt-4 gap-3 text-sm">
      <TitleFormField
        className="font-semibold sm:text-center my-4 sm:my-6 sm:text-2xl text-xl "
        title="Sign in with social"
      />
      <IconButton
        title="Continue with Google"
        className=""
        classNameIcon=""
        srcIcon="https://cdn-icons-png.flaticon.com/128/300/300221.png"
      />
      <IconButton
        title="Continue with Github"
        className=""
        classNameIcon=""
        srcIcon="https://cdn-icons-png.flaticon.com/128/2111/2111432.png"
      />
      <IconButton
        title="Continue with Facebook"
        className=""
        classNameIcon=""
        srcIcon="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
      />
      <LineUnder />
      <IconButton
        setToggleForm={setToggleForm}
        toggleForm={toggleForm}
        classNameIcon=""
        title="Continue with Email"
        className="bg-green-500 text-white hover:bg-green-700"
        srcIcon="https://cdn-icons-png.flaticon.com/128/546/546394.png"
      />
    </div>
  );
};
