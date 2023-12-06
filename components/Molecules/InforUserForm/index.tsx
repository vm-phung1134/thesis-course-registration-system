import { Button, FormField } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import { updateAuth } from "@/redux/reducer/auth/api";
import { Form, Formik } from "formik";
import { FC } from "react";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

export interface IInforUserFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  values: IAuthObject;
}

export const InforUserForm: FC<IInforUserFormProps> = ({
  setToggle,
  toggle,
  values,
}) => {
  const updateMutation = useMutationQueryAPI({
    action: updateAuth,
    queryKeyLog: ["get-one-auth"],
    successMsg: "Your information has been updated!!!",
    errorMsg: "Fail to update your information!!!",
  });
  return (
    <Formik
      initialValues={values}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateMutation.mutate(values);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <Form>
              <h4 className="text-xl font-bold mb-5">Update profile</h4>
              <FormField
                type="text"
                label="Full name"
                nameField="name"
                placeholder="Ex: Nguyen Van Anh"
                className="rounded-xl bg-slate-100 border-none capitalize"
                value={values.name}
              />
              <div className="flex gap-3 w-full">
                <div className="w-1/3">
                  <FormField
                    type="text"
                    label="Department"
                    nameField="class"
                    className="rounded-xl bg-slate-100 border-none"
                    placeholder="Ex: DI19VXXX"
                    value={values.class || ""}
                  />
                </div>
                <FormField
                  type="text"
                  label="Phone number"
                  className="rounded-xl bg-slate-100 border-none"
                  nameField="phone"
                  value={values.phone || ""}
                />
              </div>
              <div className="flex gap-3">
                <FormField
                  type="text"
                  label="Specialist Field"
                  nameField="major"
                  className="rounded-xl bg-slate-100 border-none"
                  placeholder="Ex: Computer Sciented"
                  value={values.major || ""}
                />
                <FormField
                  type="text"
                  label="Email address"
                  nameField="email"
                  className="rounded-xl bg-slate-100 border-none"
                  placeholder="Ex: Nameb1910xxx@student.ctu.edu.vn"
                  value={values.email}
                />
              </div>
              <div className="flex justify-end items-center">
                <Button
                  setToggle={setToggle}
                  toggle={toggle}
                  type="button"
                  title="Cancel"
                  className="bg-transparent border-none hover:border-none hover:bg-transparent"
                />
                <Button
                  type="submit"
                  setToggle={setToggle}
                  toggle={toggle}
                  title="Update Information"
                  className="bg-green-700 rounded-xl hover:bg-green-600 text-white px-8"
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
