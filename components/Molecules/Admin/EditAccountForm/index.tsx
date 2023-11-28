import { Button, FormField } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { INITIATE_AUTH } from "@/data";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

export interface IEditAccountFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  lecturer?: IAuthObject;
}

export const EditAccountForm: FC<IEditAccountFormProps> = ({
  setToggle,
  toggle,
  lecturer,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    () => lecturer?.role === ROLE_ASSIGNMENT.LECTURER
  );
  const updateMockLecturer = (lecturer: IAuthObject) => {
    return fetch(
      `https://6548626ddd8ebcd4ab22d6a1.mockapi.io/api/cit-user/cit_lectuters/${lecturer.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lecturer),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Failed to delete user");
    });
  };
  const editLecturerMutation = useMutationQueryAPI({
    action: updateMockLecturer,
    queryKeyLog: ["mock-lecturer-list"],
    successMsg: "Update user successfully!",
    errorMsg: "Fail to update user!",
  });

  return (
    <Formik
      initialValues={lecturer || INITIATE_AUTH}
      enableReinitialize
      onSubmit={(values) => {
        setTimeout(async () => {
          await editLecturerMutation.mutate({
            ...values,
            role: isChecked ? ROLE_ASSIGNMENT.LECTURER : ROLE_ASSIGNMENT.GUEST,
          });
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <Form>
              <div className="flex gap-5 w-full items-center">
                <FormField
                  type="text"
                  label="Full name"
                  nameField="name"
                  placeholder="Ex: Nguyen Van Anh"
                  className="rounded-xl bg-slate-100 border-none capitalize"
                  value={values.name}
                />
                <div className="w-1/3 mt-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox h-5 w-5 text-green-500 checkbox-success"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="ml-2 text-sm font-medium">
                      Role Instructor
                    </span>
                  </label>
                </div>
              </div>

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
                  label="Email address"
                  nameField="email"
                  className="rounded-xl bg-slate-100 border-none"
                  placeholder="Ex: Nameb1910xxx@student.ctu.edu.vn"
                  value={values.email}
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
                  label="Phone number"
                  className="rounded-xl bg-slate-100 border-none"
                  nameField="phone"
                  value={values.phone || ""}
                />
              </div>
              <FormField
                type="text"
                label="Avatar"
                nameField="photoSrc"
                className="rounded-xl bg-slate-100 border-none"
                placeholder="Ex: Link avatar url"
                value={values.photoSrc || ""}
              />
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
                  title="Confirm"
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
