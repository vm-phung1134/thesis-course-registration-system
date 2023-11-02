import { FC } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";
import { INITIATE_CLASSROOM } from "@/data";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IClassroomObject } from "@/interface/classroom";
import { updateClassroom } from "@/redux/reducer/classroom/api";
import useToastifyMessage from "@/hooks/useToastify";

export interface IAEditClassroomFormProps {
  classroom: IClassroomObject;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  openModal?: boolean;
}

export const AEditClassroomForm: FC<IAEditClassroomFormProps> = ({
  classroom,
  setOpenModal,
  openModal,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (postData: IClassroomObject) => {
      return new Promise((resolve, reject) => {
        dispatch(updateClassroom(postData))
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

  useToastifyMessage(updateMutation, "Classroom was successfully updated");

  return (
    <Formik
      enableReinitialize
      initialValues={classroom || INITIATE_CLASSROOM}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values) => {
        setTimeout(() => {
          updateMutation.mutate(values);
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
                label="Name instructor"
                type="text"
                nameField="name"
                className="rounded-xl bg-slate-100 border-none capitalize"
                placeholder="Ex: Nguyen Van Tuan"
                value={values?.lecturer?.name}
              />
              <FormField
                label="Email"
                type="text"
                nameField="email"
                className="rounded-xl bg-slate-100 border-none"
                placeholder="Ex: nvtuan@cit.ctu.edu.vn"
                value={values?.lecturer?.email}
              />
            </div>

            <div className="flex gap-5">
              <FormField
                label="Classroom course"
                type="text"
                nameField="classCourse"
                className="rounded-xl bg-slate-100 border-none"
                placeholder="Ex: CT550/HK1-2023"
                value={values?.classCourse}
              />
              <FormField
                label="Quantity student"
                type="number"
                className="rounded-xl bg-slate-100 border-none"
                nameField="quantityStudent"
                value={values?.quantityStudent}
              />
              <FormField
                label="Classroom status"
                type="text"
                className="rounded-xl bg-slate-100 border-none"
                nameField="status"
                value={values?.status}
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
                title="Save changes"
                className="hover:bg-[#165b31] rounded-lg normal-case bg-green-700 text-white px-10"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
