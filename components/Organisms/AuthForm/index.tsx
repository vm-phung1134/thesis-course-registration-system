import { FC, useState } from "react";
import { Formik } from "formik";
import { EmailLogin, SocialLogin } from "@/components/Molecules";
import { useAuthContext } from "@/contexts/authContext";

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
  const { signInWithEmailPassword } = useAuthContext();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        let errors: any = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        // email
        if (!values.email) {
          errors.email = "! Email is required";
        } else if (!regex.test(values.email)) {
          errors.email = "! Email invalid";
        } else if (values.email.length > 30) {
          errors.email = "! Email less than 30 characters";
        }
        // password
        if (!values.password) {
          errors.password = "! Password is required";
        } else if (values.password.length > 30) {
          errors.password = "! Password have to than 8 characters";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          signInWithEmailPassword(values.email, values.password);
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            {toggleForm ? (
              <EmailLogin
                toggleForm={toggleForm}
                setToggleForm={setToggleForm}
                values={values}
              />
            ) : (
              <SocialLogin
                toggleForm={toggleForm}
                setToggleForm={setToggleForm}
              />
            )}
            <CopyrightForm />
          </>
        );
      }}
    </Formik>
  );
};
