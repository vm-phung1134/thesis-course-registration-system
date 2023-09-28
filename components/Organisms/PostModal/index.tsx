import { Button } from "@/components/Atoms";
import { CommentForm, ContentComment } from "@/components/Molecules";
import { IPostObject } from "@/interface/post";
import { convertToUnaccentedString } from "@/utils/convertString";
import { FC } from "react";
import Link from "next/link";

export interface IPostModalProps {
  modalClass: string;
  setOpenModalPost?: React.Dispatch<React.SetStateAction<boolean>>;
  openModalPost?: boolean;
  post: IPostObject;
}

export const PostModal: FC<IPostModalProps> = ({
  modalClass,
  setOpenModalPost,
  openModalPost,
  post,
}) => {
  return (
    <dialog id="my_modal_2" className={modalClass}>
      <div className="w-5/12 bg-white p-5 h-fit shadow-2xl overflow-y-scroll">
        <div className="h-full px-3">
          <div className="border-b pb-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center mb-2">
                <p className="text-xs px-3 py-1 bg-green-700 cursor-pointer text-white w-fit">
                  {post?.type === "post" ? "Message" : "Postercise"}
                </p>
                <p>|</p>
                <p className="text-sm">{post?.category?.label} Stage</p>
              </div>
              <button
                onClick={() => setOpenModalPost?.(!openModalPost)}
                className="btn btn-sm  btn-circle border"
              >
                ✕
              </button>
            </div>

            <h3 className="font-medium uppercase text-green-700">
              {post?.title}
            </h3>
            <p className="font-medium uppercase py-1">
              {convertToUnaccentedString(post?.lecturer?.name)}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {`20, August 2023 - `}
                <span className="text-sm">{`12:36 AM (Edited)`}</span>
              </p>
            </div>
          </div>
          <div className="py-5 font-thin border-b text-sm">
            <p className="py-2">General information</p>
            <ul className="font-normal indent-3">
              <li>{post?.description}</li>
              <li>At the report you will review what you are doing.</li>
            </ul>
            <div>
              <p className="py-2">Document references</p>
              {post?.attachments?.map((arr, index) => {
                return (
                  <a
                    target="_blank"
                    className="text-sm underline text-blue-700"
                    key={index}
                    href={arr.src}
                  >
                    {arr.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="py-5 flex flex-col gap-3">
            <CommentForm task={post} />
            <ContentComment quantity={1000} task={post} />
            <Button
              className="rounded-none w-full"
              title="View more comments"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};
