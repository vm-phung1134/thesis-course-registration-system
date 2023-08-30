import {
  IconButton,
  IconButtonLogin,
  LineUnder,
  TitleFormField,
} from "@/components/Atoms";
import { useAuthContext } from "@/contexts/authContext";
import { FC } from "react";

export interface ISocialLoginProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
}

export const SocialLogin: FC<ISocialLoginProps> = ({
  toggleForm,
  setToggleForm,
}) => {
  const { signInWithGoogle, message } = useAuthContext();
  return (
    <div className="flex flex-col mt-4 gap-3 text-sm">
      <TitleFormField
        className="font-semibold sm:text-center my-4 sm:my-6 sm:text-2xl text-xl "
        title="Sign in with social"
      />
      <p className="text-red-600 text-xs text-center">
        {message}
      </p>
      <IconButtonLogin
        title="Continue with Google"
        methodLogin={signInWithGoogle}
        srcIcon="https://cdn-icons-png.flaticon.com/128/300/300221.png"
      />
      <IconButtonLogin
        methodLogin={() => {}}
        title="Continue with Github"
        srcIcon="https://cdn-icons-png.flaticon.com/128/2111/2111432.png"
      />
      <IconButtonLogin
        methodLogin={() => {}}
        title="Continue with Facebook"
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
