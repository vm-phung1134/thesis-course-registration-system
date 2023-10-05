import { FC } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";
import { INITIATE_CLASSROOM } from "@/data";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IClassroomObjectNew } from "@/interface/classroom";
import { createClassroom } from "@/redux/reducer/classroom/api";
import { IAuthObject } from "@/interface/auth";

export interface IACreateClassroomFormProps {
  listAccount: IAuthObject[];
  setOpenCreateClass: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateClass: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  openModal?: boolean;
}

export const ACreateClassroomForm: FC<IACreateClassroomFormProps> = ({
  listAccount,
  setOpenCreateClass,
  openCreateClass,
  setOpenModal,
  openModal,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    (postData: Omit<IClassroomObjectNew, "id">) => {
      return new Promise((resolve, reject) => {
        dispatch(createClassroom(postData))
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
        queryClient.invalidateQueries(["classrooms-admin"]);
      },
    }
  );

  return (
    <Formik
      initialValues={INITIATE_CLASSROOM}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          listAccount.forEach(async (account: IAuthObject) => {
            await addMutation.mutate({
              lecturer: account,
              quantityStudent: values.quantityStudent,
              classCourse: values.classCourse,
            });
          });
          resetForm();
          setOpenModal?.(!openModal);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form>
            <div className="flex gap-5">
              <FormField
                label="Classroom course"
                type="text"
                nameField="classCourse"
                placeholder="Ex: CT550/HK1-2023"
                value={values.classCourse}
              />
              <FormField
                label="Quantity student"
                type="number"
                nameField="quantity"
                value={values.quantityStudent}
              />
            </div>
            <p className="text-xs font-thin italic tracking-wide">
              Noticed: You can set quantity more than 15 people each classroom
            </p>
            <div className="flex justify-end items-center mt-3">
              <Button
                title="Cancel"
                setToggle={setOpenCreateClass}
                toggle={openCreateClass}
                otherType="detail"
                className="bg-transparent dark:text-green-700 border-none hover:border-none hover:bg-transparent"
              />
              <Button
                type="submit"
                title="Confirm"
                setToggle={setOpenCreateClass}
                toggle={openCreateClass}
                className="hover:bg-[#165b31] normal-case bg-green-700 text-white px-10"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
