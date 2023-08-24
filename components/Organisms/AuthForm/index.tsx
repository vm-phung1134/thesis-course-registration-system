import { FC, useState } from "react";
import { Formik } from "formik";
import { EmailLogin, SocialLogin } from "@/components/Molecules";

export interface IAuthFormProps {}

const CopyrightForm = () => {
  return (
    <div className="flex items-center flex-col text-black text-[10px] my-5">
      <p className="">©2023 Minh_Phung, Inc. All Rights Reserved.</p>
      <p>Privacy policy</p>
    </div>
  );
};

export const AuthForm: FC<IAuthFormProps> = () => {
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
        }
        if (!values.password) {
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <>
        {toggleForm ? (
          <EmailLogin toggleForm={toggleForm} setToggleForm={setToggleForm} />
        ) : (
          <SocialLogin toggleForm={toggleForm} setToggleForm={setToggleForm} />
        )}
        <CopyrightForm />
      </>
    </Formik>
  );
};
