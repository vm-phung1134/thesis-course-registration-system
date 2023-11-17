import { Button } from "@/components/Atoms";
import {
  CommentForm,
  ContentComment,
  ContentCommentModal,
} from "@/components/Molecules";
import { IPostObject } from "@/interface/post";
import { convertToUnaccentedString } from "@/utils/convertString";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <dialog id="modal_post_form" className={modalClass}>
      <div className="w-5/12 bg-white p-3 h-fit shadow-2xl rounded-xl">
        <div className="h-full px-3">
          <div className="border-b pb-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center mb-2">
                <p className="text-xs px-3 py-1 bg-green-700 cursor-pointer rounded-md text-white w-fit">
                  {post?.type === "post" ? "Message" : "Postercise"}
                </p>
                <p>|</p>
                <p className="text-sm">{post?.category?.label} Stage</p>
              </div>
              <button
                onClick={() => setOpenModalPost?.(!openModalPost)}
                className="btn pr-5 text-xs btn-sm bg-transparent btn-circle border-none hover:bg-transparent"
              >
                Close
              </button>
            </div>

            <h3 className="font-medium text-green-700 text-lg capitalize">
              {post?.title}
            </h3>

            <div className="flex gap-3 items-center py-1">
              <p className="font-medium text-sm capitalize">
                {convertToUnaccentedString(post?.lecturer?.name)}
              </p>
              <p className="text-xs">
                {`20, August 2023 - `}
                <span className="text-xs">{`12:36 AM (Edited)`}</span>
              </p>
            </div>
          </div>
          <div className="py-5 font-thin border-b text-sm">
            <p className="py-2 tracking-wider font-medium">
              General information
            </p>
            <ul className="font-normal indent-3">
              <li>{post?.description}</li>
              <li>At the report you will review what you are doing.</li>
            </ul>
            <p className="py-2 font-medium">Document references</p>
            <div className="flex gap-3">
              {post?.attachments?.map((arr, index) => {
                return (
                  <div
                    key={arr.id}
                    className="flex gap-3 text-blue-700 font-medium rounded-md items-center px-3 py-2 bg-slate-200 shadow-md"
                  >
                    <Image
                      width={20}
                      height={20}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/4726/4726010.png"
                      }
                      alt="icon-file-pdf"
                    />
                    <a
                      className="text-[13px]"
                      target="_blank"
                      key={index}
                      href={arr.src}
                    >
                      {arr.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="py-5 flex flex-col gap-3">
            <CommentForm task={post} />
            <ContentCommentModal quantity={5} task={post} />
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
