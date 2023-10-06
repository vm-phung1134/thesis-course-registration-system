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
      <Link href="/" className="text-[13px] hover:underline">
        Forget password?
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
      <TitleFormField
        className="font-semibold sm:text-center my-4 sm:my-6 sm:text-2xl text-xl "
        title="Sign in with email account"
      />
      <p className="text-red-600 text-xs text-center">{message}</p>
      <FormField
        type="email"
        label="Email"
        nameField="email"
        value={values.email}
      />
      <FormField
        type="password"
        label="Password"
        nameField="password"
        value={values.password}
      />
      <ActionFormField />
      <Button className="bg-green-600 w-full text-white" title="Sign In" />
      <LineUnder />
      <IconButton
        setToggleForm={setToggleForm}
        toggleForm={toggleForm}
        className="w-full"
        classNameIcon="w-3"
        srcIcon="https://cdn-icons-png.flaticon.com/128/271/271220.png"
        title="Continue with social media"
      />
    </Form>
  );
};
