import { FC } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";
import { INITIATE_CLASSROOM } from "@/data";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IClassroomObject, IClassroomObjectInput } from "@/interface/classroom";
import { createClassroom } from "@/redux/reducer/classroom/api";
import { IAuthObject } from "@/interface/auth";
import useToastifyMessage from "@/hooks/useToastify";

export interface IACreateClassroomFormProps {
  listAccount: IAuthObject[];
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  openModal?: boolean;
}

export const ACreateClassroomForm: FC<IACreateClassroomFormProps> = ({
  listAccount,
  setOpenModal,
  openModal,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    (postData: Omit<IClassroomObjectInput, "id">) => {
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
        queryClient.invalidateQueries(["classrooms"]);
      },
    }
  );

  useToastifyMessage(addMutation, "Generating the classroom successfully");

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
              lecturerID: account.id,
              quantityStudent: values.quantityStudent,
              classCourse: values.classCourse,
              status: "UN_LOCK",
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
                className="rounded-xl bg-slate-100 border-none"
                placeholder="Ex: CT550/HK1-2023"
                value={values.classCourse}
              />
              <FormField
                label="Quantity student"
                type="number"
                className="rounded-xl bg-slate-100 border-none"
                nameField="quantityStudent"
                value={values.quantityStudent}
              />
            </div>
            <p className="text-xs font-thin italic tracking-wide">
              Noticed: You can set quantity more than 15 people each classroom
            </p>
            <div className="flex justify-end items-center mt-3">
              <Button
                title="Cancel"
                setToggle={setOpenModal}
                toggle={openModal}
                type="button"
                className="bg-transparent dark:text-green-700 border-none hover:border-none hover:bg-transparent"
              />
              <Button
                type="submit"
                title="Confirm"
                className="hover:bg-[#165b31] rounded-lg normal-case bg-green-700 text-white px-10"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
