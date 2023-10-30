import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { Button, FormField, NormalAvatar } from "@/components/Atoms";
import { INITIATE_ASSESS, INITIATE_AUTH } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IStudentDefObject } from "@/interface/studef";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { IPointDefObject } from "@/interface/pointDef";
import { createPointDef } from "@/redux/reducer/point-def/api";
const objectId = uuidv4();

export interface IAssessFormProps {
  student?: IStudentDefObject;
}

export const AssessForm: FC<IAssessFormProps> = ({ student }) => {
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    (postData: IPointDefObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createPointDef(postData))
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
        queryClient.invalidateQueries(["point-def"]);
      },
    }
  );
  return (
    <Formik
      initialValues={INITIATE_ASSESS}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values) => {
        setTimeout(() => {
          addMutation.mutate({
            student: student?.infor || INITIATE_AUTH,
            assesses: [
              {
                id: objectId,
                lecturer: currentUser,
                point: values.point,
                comment: values.comment,
              },
            ],
          });
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form className="mt-5 p-5 shadow-lg rounded-2xl">
            <div className="flex gap-5 mb-3">
              <div className="flex flex-col items-center justify-center w-full">
                <NormalAvatar photoSrc={currentUser?.photoSrc} setSize="w-10" />
                <p className="capitalize font-medium">{currentUser?.name}</p>
                <p>{currentUser?.email}</p>
              </div>
              <div className="mt-2 w-full">
                <div className="flex gap-3 items-center">
                  <FormField
                    className="rounded-full bg-slate-100 border-none"
                    type="number"
                    placeholder="8.5"
                    value={values?.point}
                    label={"Point"}
                    nameField={"point"}
                  />
                  <Button
                    type="submit"
                    title="Done"
                    className="py-2 rounded-full px-5 bg-green-700 text-white"
                  />
                </div>
              </div>
            </div>
            <Field
              className="input text-sm rounded-full w-full  bg-slate-100 focus:outline-none"
              type="text"
              id="comment"
              placeholder="Enter your comment ..."
              name="comment"
              value={values?.comment}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
