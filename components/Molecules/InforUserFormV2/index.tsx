import {
  Button,
  FormField,
  SnipperRound,
  TitleFormField,
} from "@/components/Atoms";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IAuthObject } from "@/interface/auth";
import { updateAuth } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FC } from "react";

export interface IInforUserFormV2Props {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const InforUserFormV2: FC<IInforUserFormV2Props> = ({
  setSwitchingForm,
  switchingForm,
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
  return (
    <Formik
      initialValues={currentUser}
      validate={(values) => {
        let errors: any = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phoneNumberRegex = /^0\d{9,10}$/;
        // name
        if (!values.name) {
          errors.name = "! Name is required";
        } else if (values.name.length > 100) {
          errors.name = "! Name less than 100 characters";
        }
        // email
        if (!values.email) {
          errors.email = "! Email is required";
        } else if (!emailRegex.test(values.email)) {
          errors.email = "! Email invalid";
        } else if (values.email.length > 100) {
          errors.email = "! Email less than 100 characters";
        }
        // phone
        if (!values.phone) {
          errors.phone = "! Phone number is required";
        } else if (!phoneNumberRegex.test(values.phone)) {
          errors.phone = "! Phone number invalid";
        }
        // major
        if (!values.major) {
          errors.major = "! Major number is required";
        }
        return errors;
      }}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateMutation.mutate(values);
          setSwitchingForm(switchingForm + 1);
          setSubmitting(false);
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
              <div>
                <h3 className="text-xs mb-3">Step {switchingForm} of 2</h3>
                <Form>
                  <TitleFormField
                    className="text-base uppercase text-green-700 font-medium mb-5"
                    title="Update personal information"
                  />
                  <FormField
                    placeholder="Ex: Nguyen Van Anh"
                    type="text"
                    label="Full name"
                    nameField="name"
                    value={values?.name}
                  />
                  <FormField
                    type="text"
                    placeholder="Ex: nvan@ctu.edu.vn"
                    label="Email address"
                    nameField="email"
                    value={values?.email}
                  />
                  <div className="flex gap-5 w-full">
                    <FormField
                      placeholder="Ex: 0953252xxx"
                      type="text"
                      label="Phone number"
                      nameField="phone"
                      value={values?.phone || ""}
                    />
                    <FormField
                      placeholder="Ex: IT colleage"
                      type="text"
                      label="School"
                      nameField="class"
                      value={values?.class || ""}
                    />
                  </div>
                  <FormField
                    placeholder="Ex: Network computer"
                    type="text"
                    label="Major"
                    nameField="major"
                    value={values?.major || ""}
                  />
                  <div className="flex justify-end items-center">
                    <Button
                      type="submit"
                      title="Next step"
                      className="hover:bg-[#165b31] btn rounded-none font-normal normal-case w-28 bg-green-700 text-white px-5"
                    />
                  </div>
                </Form>
              </div>
            )}
          </>
        );
      }}
    </Formik>
  );
};
