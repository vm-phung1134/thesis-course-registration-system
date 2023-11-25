import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { Button, FormField, NormalAvatar } from "@/components/Atoms";
import { INITIATE_ASSESS, INITIATE_AUTH } from "@/data";
import { IStudentDefObject } from "@/interface/studef";
import { v4 as uuidv4 } from "uuid";
import { IAssessItem } from "@/interface/pointDef";
import { createPointDef } from "@/redux/reducer/point-def/api";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

export interface IAssessFormProps {
  student?: IStudentDefObject;
  assessStudent?: IAssessItem;
}

export const AssessForm: FC<IAssessFormProps> = ({
  student,
  assessStudent,
}) => {
  const { currentUser } = useCurrentUserContext();
  const addMutation = useMutationQueryAPI({
    action: createPointDef,
    queryKeyLog: ["get-one-point"],
    successMsg: "You have performed an assessment for this student!!!",
    errorMsg: "Fail to performed an assessment",
  });
  return (
    <Formik
      enableReinitialize
      initialValues={assessStudent || INITIATE_ASSESS}
      validate={(values) => {
        let errors: any = {};
        if (!values.point) {
          errors.point = "! Point is required";
        }
        if (!values.comment) {
          errors.comment = "! Assessment is required";
        }
        return errors;
      }}
      onSubmit={(values) => {
        let objectId = uuidv4();
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
        const { values, errors } = formik;
        return (
          <>
            <Form className="mt-5 p-5 shadow-lg rounded-2xl">
              <div className="flex gap-5 mb-3">
                <div className="flex flex-col items-center justify-center w-full">
                  <NormalAvatar
                    photoSrc={currentUser?.photoSrc}
                    setSize="w-10"
                  />
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
              <span className="text-[13px] text-red-500">{errors.comment}</span>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
