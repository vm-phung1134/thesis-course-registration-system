import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { ICommentObject } from "@/interface/comment";
import { IPostObject } from "@/interface/post";
import { IExerciseObject } from "@/interface/exercise";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/redux/reducer/comment/api";
import { useAppDispatch } from "@/redux/store";
import { INITIATE_COMMENT, TYPE_ACTION_NOTIFICATION } from "@/data";
import { IAuthObject } from "@/interface/auth";
import { useSocket } from "@/contexts/useSocketContext";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

export interface ICommentFormProps {
  task: IPostObject | IExerciseObject;
}

export const CommentForm: FC<ICommentFormProps> = ({ task }) => {
  const initialValues = INITIATE_COMMENT;
  const { currentUser } = useCurrentUserContext();
  const addMutation = useMutationQueryAPI({
    action: createComment,
    queryKeyLog: ["comments", "comments-modal"],
    successMsg: "You just added a comment!",
    errorMsg: "Fail to send the comment!",
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
