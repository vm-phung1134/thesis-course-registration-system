import { FC } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import { useAuthContext } from "@/contexts/authContext";

export interface IChangePassFormProps {
  currentUser: IAuthObject;
}

export const ChangePassForm: FC<IChangePassFormProps> = ({ currentUser }) => {
  const { changePassword } = useAuthContext();
  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validate={(values) => {
        let errors: any = {};
        if (!values.currentPassword) {
          errors.currentPassword = "! Current password is required";
        } else if (!(values.currentPassword == currentUser.password)) {
          errors.currentPassword = "! Password incorrect";
        } else if (!values.currentPassword.match(/^[a-zA-Z0-9\s]*$/)) {
          errors.currentPassword =
            "! The password does not contain special characters";
        }
        if (!values.newPassword.trim()) {
          errors.newPassword = "! New Password is required";
        } else if (!values.newPassword.match(/^[a-zA-Z0-9\s]*$/)) {
          errors.newPassword =
            "! The password does not contain special characters";
        } else if (values.newPassword.length < 6) {
          errors.newPassword = "! Password must have minimum 6 characters";
        }
        if (!values.confirmPassword.match(/^[a-zA-Z0-9\s]*$/)) {
          errors.confirmPassword;
          ("! The password does not contain special characters");
        } else if (!(values.confirmPassword === values.newPassword)) {
          errors.confirmPassword = "! The password not match";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          changePassword(currentUser, values.newPassword.trim());
          resetForm();
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <Form>
              <div className="flex gap-5">
                <div className="flex flex-col w-fit">
                  <p className="text-sm mb-2">
                    If you wish to reset your password, please enter your
                    current password first!!
                  </p>
                  <FormField
                    label="Current password"
                    type="password"
                    nameField="currentPassword"
                    className="rounded-xl bg-slate-100 border-none"
                    value={values.currentPassword}
                    autocomplete="new-password"
                  />
                  <FormField
                    label="New password"
                    type="password"
                    className="rounded-xl bg-slate-100 border-none"
                    nameField="newPassword"
                    value={values.newPassword}
                  />
                  <FormField
                    label="Confirm password"
                    type="password"
                    className="rounded-xl bg-slate-100 border-none"
                    nameField="confirmPassword"
                    value={values.confirmPassword}
                  />
                  <div className="flex justify-end items-center mt-3">
                    <Button
                      type="submit"
                      title="Save changes"
                      className="hover:bg-[#165b31] rounded-xl normal-case bg-green-700 text-white px-10"
                    />
                  </div>
                </div>
                <div className="p-5 bg-slate-50 h-fit text-sm rounded-xl">
                  <h3 className="font-medium">Password Rules</h3>
                  <p>
                    To create a new password, you have to meet all of the
                    following rules:{" "}
                  </p>
                  <div className="ml-7">
                    <ul className="list-disc">
                      <li>Minimum of 8 characters</li>
                      <li>At least one speacial character</li>
                      <li>At least one number</li>
                      <li>Cannot be the same as previous password</li>
                      <li>No repeat characters such as 222</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
