import { Avatar, Button } from "@/components/Atoms";
import { IMemberObject } from "@/interface/member";
import { createMember } from "@/redux/reducer/member/api";
import { deleteRequirement } from "@/redux/reducer/requirement/api";
import { getTopic } from "@/redux/reducer/topic/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";

export interface ICardRequireMemberProps {
  require: IMemberObject;
  setOpenMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMemberModal: boolean;
  handleGetTopicRequire: (require: IMemberObject) => void;
}
export const CardRequireMember: FC<ICardRequireMemberProps> = ({
  require,
  setOpenMemberModal,
  openMemberModal,
  handleGetTopicRequire,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // HANDLE GET TOPIC BECAUSE IN TOPIC HAVE MEMBER AND TOPIC
  const handleShowModalRequire = (require: IMemberObject) => {
    setOpenMemberModal(!openMemberModal);
    handleGetTopicRequire(require);
  };
  // HANDLE ADD TO CLASS
  const addMutation = useMutation(
    (postData: IMemberObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createMember(postData))
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
        queryClient.invalidateQueries(["requirements"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postData: IMemberObject) => {
      return new Promise((resolve, reject) => {
        dispatch(deleteRequirement(postData))
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
        queryClient.invalidateQueries(["requirements"]);
      },
    }
  );
  const handleAcceptClass = () => {
    addMutation.mutate({
      registerDefense: false,
      member: require.member,
      classroom: require.classroom,
    });
    deleteMutation.mutate(require);
  };
  // GET TOPIC FOR EACH USER
  const { topic } = useAppSelector((state) => state.topicReducer);
  useEffect(() => {
    dispatch(getTopic(require?.member));
  }, [dispatch, require?.member]);
  return (
    <div className="p-3 border shadow-lg">
      <div className="flex gap-4 items-center">
        <Avatar
          online={true}
          widthStr="w-10 h-10"
          srcImg={require?.member?.photoSrc}
        />
        <div className="flex flex-col text-sm">
          <div className="flex gap-3">
            <p
              onClick={() => handleShowModalRequire(require)}
              className="uppercase font-medium cursor-pointer"
            >
              {convertToUnaccentedString(require?.member?.name)}
            </p>
            <span>-</span>
            <p className="font-normal">{require?.member?.class}</p>
          </div>

          <p className="capitalize">{require?.member?.major}</p>
        </div>
      </div>
      <div className="py-1">
        <p className="text-[15px] py-2 truncate">Topic: {topic?.title}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 pt-2">
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-regular fa-message"></i>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              title="Decline"
              className="text-red-700 btn-sm border-none  bg-transparent"
            />
            <Button
              handleActions={handleAcceptClass}
              title="Accept"
              otherType="subscribe"
              className="bg-green-700 text-white btn-sm px-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
