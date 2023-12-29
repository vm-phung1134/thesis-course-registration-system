import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { IPostObject } from "@/interface/post";
import { IExerciseObject } from "@/interface/exercise";
import { INITIATE_COMMENT } from "@/data";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { createComment } from "@/redux/reducer/comment/api";

export interface ICommentFormProps {
  task: IPostObject | IExerciseObject;
}

export const CommentForm: FC<ICommentFormProps> = ({ task }) => {
  const initialValues = INITIATE_COMMENT;
  const { currentUser } = useCurrentUserContext();
  const addMutation = useMutationQueryAPI({
    action: createComment,
    queryKeyLog: ["task-comments"],
  });
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          addMutation.mutate({
            ...values,
            postId: task.uid,
            user: currentUser,
          });
          resetForm();
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <div className="relative">
          <Field
            className="input text-sm border-none bg-slate-100 rounded-full w-full  focus:outline-none"
            type="text"
            id="content"
            placeholder="Enter your comment ..."
            name="content"
          />
          <button
            type="submit"
            className="absolute text-green-700 w-20 bg-transparent border-none text-base rounded-full font-medium normal-case btn right-0 top-0 bottom-0"
          >
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </Form>
    </Formik>
  );
};
