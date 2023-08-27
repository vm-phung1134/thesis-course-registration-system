import { FC } from "react";

export interface ICommentFormProps {}

export const CommentForm: FC<ICommentFormProps> = () => {
  return (
    <form action="/" method="POST" className="relative">
      <input
        type="text"
        name="content"
        id="content"
        placeholder="Enter your comment ..."
        className="input text-sm rounded-none w-full border-gray-300  focus:outline-none"
      />
      <button
        type="submit"
        className="absolute text-black w-28 text-[13px] rounded-none font-medium normal-case btn right-0 top-0 bottom-0"
      >
        Send
        <i className="fa-regular fa-paper-plane"></i>
      </button>
    </form>
  );
};
