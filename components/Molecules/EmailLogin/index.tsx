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

export interface IEmailLoginProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
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
}) => {
  return (
    <Form>
      <TitleFormField title="Sign in with email account" />
      <FormField type="email" label="Email" nameField="email" />
      <FormField type="password" label="Password" nameField="password" />
      <ActionFormField />
      <Button className="bg-green-600 text-white" title="Sign In" />
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
