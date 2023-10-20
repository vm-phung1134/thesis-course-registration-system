import { FC } from "react";
import { Form } from "formik";
import {
  Button,
  FormField,
  IconButton,
  LineUnder,
  TitleFormField,
} from "@/components/Atoms";
import Link from "next/link";
import { useAuthContext } from "@/contexts/authContext";

export interface IEmailLoginProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
  values: {
    email: string;
    password: string;
  };
}

const ActionFormField = () => {
  return (
    <div className="flex justify-end mb-6">
      <Link href="/" className="text-[13px] text-red-600 hover:underline tracking-wide">
        Forgot password?
      </Link>
    </div>
  );
};

export const EmailLogin: FC<IEmailLoginProps> = ({
  setToggleForm,
  toggleForm,
  values,
}) => {
  const { message } = useAuthContext();
  return (
    <Form>
      <p className="text-red-600 text-xs text-center">{message}</p>
      <FormField
        type="email"
        label="Email address"
        nameField="email"
        placeholder="example@cit.ctu.edu.vn"
        value={values.email}
      />
      <FormField
        type="password"
        label="Password"
        nameField="password"
        value={values.password}
      />
      <ActionFormField />
      <Button className="bg-green-700 w-full text-white" title="Sign In" />
      <LineUnder />
      <IconButton
        setToggleForm={setToggleForm}
        toggleForm={toggleForm}
        className="w-full "
        classNameIcon="w-3"
        srcIcon="https://cdn-icons-png.flaticon.com/128/271/271220.png"
        title="Continue with social media"
      />
    </Form>
  );
};
