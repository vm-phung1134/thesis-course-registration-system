import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { ICommentObject } from "@/interface/comment";
import { INITIATE_AUTH } from "@/data";
import { useUserCookies } from "@/hooks/useCookies";

export interface ICommentFormProps {
  arrComment: ICommentObject[];
  setArrComment: React.Dispatch<React.SetStateAction<ICommentObject[]>>;
}

export const CommentForm: FC<ICommentFormProps> = ({
  arrComment,
  setArrComment,
}) => {
  const [userCookies] = useUserCookies();
  const initialValues = {
    user: userCookies || INITIATE_AUTH,
    content: "",
    postId: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setArrComment((prev) => [values, ...prev]);
        }, 400);
      }}
    >
      <Form>
        <div className="relative">
          <Field
            className="input text-sm rounded-none w-full border-gray-300  focus:outline-none"
            type="text"
            id="content"
            placeholder="Enter your comment ..."
            name="content"
          />
          <button
            type="submit"
            className="absolute text-black w-28 text-[13px] rounded-none font-medium normal-case btn right-0 top-0 bottom-0"
          >
            Send
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </Form>
    </Formik>
  );
};
