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
      <p className="text-red-600 text-xs text-center">{message}</p>
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
        className="bg-green-700 text-white tracking-wide hover:bg-green-600"
        srcIcon="https://cdn-icons-png.flaticon.com/128/9795/9795321.png"
      />
    </div>
  );
};
