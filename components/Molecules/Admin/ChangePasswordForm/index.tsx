import { FC } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";
export interface IChangePassFormProps {}

export const ChangePassForm: FC<IChangePassFormProps> = ({}) => {
  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {}, 400);
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
                    type="text"
                    nameField="name"
                    className="rounded-xl bg-slate-100 border-none"
                    value={""}
                  />
                  <FormField
                    label="New password"
                    type="text"
                    className="rounded-xl bg-slate-100 border-none"
                    nameField="type"
                    value={""}
                  />
                  <FormField
                    label="Confirm password"
                    type="text"
                    className="rounded-xl bg-slate-100 border-none"
                    nameField="type"
                    value={""}
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
