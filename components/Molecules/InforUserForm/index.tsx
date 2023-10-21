import {
  Button,
  FormField,
  SelectMulti,
  SnipperRound,
  TitleFormField,
} from "@/components/Atoms";
import { SELECT_MULTI_TOPIC_KEY } from "@/components/Atoms/SelectMulti/mock-data";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IAuthObject } from "@/interface/auth";
import { ITopicKeyObject } from "@/interface/classroom";
import { updateAuth } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FC, useState } from "react";

export interface IInforUserFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  values: IAuthObject;
}

export const InforUserForm: FC<IInforUserFormProps> = ({
  setToggle,
  toggle,
}) => {
  const queryClient = useQueryClient();
  const { currentUser, isLoading } = useCurrentUser();
  const dispatch = useAppDispatch();
  const updateMutation = useMutation(
    (postData: IAuthObject) => {
      return new Promise((resolve, reject) => {
        dispatch(updateAuth(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["auth", currentUser]);
      },
    }
  );
  const [selected, setSelected] = useState<ITopicKeyObject[]>([
    SELECT_MULTI_TOPIC_KEY[0],
    SELECT_MULTI_TOPIC_KEY[1],
  ]);
  return (
    <Formik
      initialValues={currentUser}
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
            {isLoading ? (
              <SnipperRound />
            ) : (
              <Form>
                <h4 className="text-xl font-bold mb-5">Update profile</h4>
                <FormField
                  type="text"
                  label="Full name"
                  nameField="name"
                  placeholder="Ex: Nguyen Van Anh"
                  className="rounded-xl bg-slate-100 border-none"
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
                {values.role === ROLE_ASSIGNMENT.LECTURER && (
                  <div className="mb-4 flex flex-col gap-2">
                    <label className="text-sm tracking-wide font-medium">
                      Topics research
                    </label>
                    <SelectMulti
                      setSelected={setSelected}
                      selected={selected}
                      options={SELECT_MULTI_TOPIC_KEY}
                    />
                  </div>
                )}
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
            )}
          </>
        );
      }}
    </Formik>
  );
};
