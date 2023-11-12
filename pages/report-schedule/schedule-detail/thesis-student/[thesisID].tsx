import {
  Avatar,
  Breadcrumb,
  NormalAvatar,
  SnipperRound,
} from "@/components/Atoms";
import { AssessForm } from "@/components/Molecules";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";
import { MainboardTemplate } from "@/components/Templates";
import { INITIATE_ASSESS, INITIATE_AUTH, INITIATE_TOPIC } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IAssessItem } from "@/interface/pointDef";
import { ICouncilDef } from "@/interface/schedule";
import { ITopicObject } from "@/interface/topic";
import { IUploadReportObject } from "@/interface/upload";
import {
  getOnePointDef,
  getOnePointDefForLecturer,
} from "@/redux/reducer/point-def/api";
import { getScheduleForStudent } from "@/redux/reducer/schedule-def/api";
import { getTopic } from "@/redux/reducer/topic/api";
import { getUploadReport } from "@/redux/reducer/upload-def/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function ThesisDefenseStudentDetail() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUser();
  const params = useSearchParams();
  const id = params.get("thesisID") || "";
  const { data: studentScheduled } = useQuery<ICouncilDef>({
    queryKey: ["studentScheduled", id],
    queryFn: async () => {
      const action = await dispatch(getScheduleForStudent(id));
      return action.payload || {};
    },
  });

  const { data: uploadReport } = useQuery<IUploadReportObject>({
    queryKey: ["upload-report", id],
    queryFn: async () => {
      const action = await dispatch(getUploadReport(id));
      return action.payload || {};
    },
  });

  const { data: topic } = useQuery<ITopicObject>({
    queryKey: [
      "topic",
      studentScheduled?.schedule?.timeSlots[0]?.student?.infor,
    ],
    queryFn: async () => {
      const action = await dispatch(
        getTopic(
          studentScheduled?.schedule?.timeSlots[0]?.student?.infor ||
            INITIATE_AUTH
        )
      );
      return action.payload || INITIATE_TOPIC;
    },
  });

  const { data: assessStudent } = useQuery<IAssessItem>({
    queryKey: [
      "assess-student",
      studentScheduled?.schedule?.timeSlots[0]?.student?.infor.id,
      currentUser.id,
    ],
    queryFn: async () => {
      const action = await dispatch(
        getOnePointDefForLecturer({
          studentId:
            studentScheduled?.schedule?.timeSlots[0]?.student?.infor.id || "",
          lecturerId: currentUser.id,
        })
      );
      return action.payload || INITIATE_ASSESS;
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <MainboardTemplate title="Thesis defense for student | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
            <div className="grid grid-cols-12 gap-5 text-sm">
              <div className="col-span-7 mt-5 flex gap-5 flex-col tracking-wider">
                <div className="p-5 bg-gray-100 rounded-xl">
                  <div className="text-sm my-1 flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <path d="M19 12H6M12 5l-7 7 7 7" />
                    </svg>{" "}
                    <p> Back to schedule</p>
                  </div>
                  <h4 className="py-2 px-3 text-green-700 text-xl font-bold my-1">
                    Thesis defense of student
                  </h4>
                  <div className="p-3 bg-white rounded-lg">
                    <h5 className="text-sm text-green-700 my-2 font-medium">
                      Information student
                    </h5>
                    <ul className="flex gap-3 flex-wrap">
                      <li className="flex gap-2">
                        <p className="text-gray-600">ID Student:</p>
                        <p className="text-gray-700 font-medium">
                          {
                            studentScheduled?.schedule?.timeSlots[0]?.student
                              ?.infor?.name
                          }
                        </p>
                      </li>
                      <li className="flex gap-2">
                        <p className="text-gray-600">Email:</p>
                        <p className="text-gray-700 font-medium">
                          {
                            studentScheduled?.schedule?.timeSlots[0]?.student
                              ?.infor?.email
                          }
                        </p>
                      </li>
                    </ul>
                    <h5 className="text-sm text-green-700 my-2 font-medium">
                      Time defense
                    </h5>
                    <ul className="flex gap-5">
                      <li className="flex gap-2">
                        <p className="text-gray-600">Date report:</p>
                        <p className="text-gray-700 font-medium">
                          {
                            studentScheduled?.schedule?.timeSlots[0].timeSlot
                              ?.date
                          }
                        </p>
                      </li>
                      <li className="flex gap-2">
                        <p className="text-gray-600">Room:</p>
                        <p className="text-gray-700 font-medium">
                          {studentScheduled?.schedule?.room?.name}
                        </p>
                      </li>
                      <li className="flex gap-2">
                        <p className="text-gray-600">Time:</p>
                        <p className="text-gray-700 font-medium">
                          {
                            studentScheduled?.schedule?.timeSlots[0]?.timeSlot
                              ?.time
                          }
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-5 bg-gray-100 rounded-xl">
                  <h4 className="py-2 px-3 text-green-700 text-xl font-bold my-1">
                    Topic searching
                  </h4>
                  <div className="p-3 rounded-xl bg-white">
                    <h5 className="text-sm text-green-700 my-2 font-medium">
                      Information topic
                    </h5>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <p className="text-gray-600">Name topic:</p>
                        <p className="text-gray-700 font-medium">
                          {topic?.title}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <p className="text-gray-600">File thesis report:</p>
                        <div className="w-full">
                          <ul className="text-sm w-full flex flex-col gap-2 mb-10 font-medium px-2">
                            {uploadReport?.attachments?.map((file) => (
                              <div
                                key={file?.id}
                                className="flex gap-3 text-blue-700 font-medium rounded-md items-center px-3 py-2 bg-slate-200 shadow-md"
                              >
                                <Image
                                  width={20}
                                  height={20}
                                  src={
                                    "https://cdn-icons-png.flaticon.com/128/4725/4725970.png"
                                  }
                                  alt="icon-file-pdf"
                                />
                                <a
                                  className="text-[13px] truncate"
                                  target="_blank"
                                  href={file?.src}
                                >
                                  {file?.name}
                                </a>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-600">Description:</p>
                        <p className="flex gap-2 flex-col">
                          <span className="text-gray-700">
                            - Create a website allow user CRUD blog
                          </span>
                          <span className="text-gray-700">
                            - Chatbox real time by using socket.io
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5">
                <h4 className="py-2 text-green-700 text-xl font-bold my-1">
                  Review from the Dissertation Council
                </h4>
                <p className="text-xs text-gray-500 italic">
                  Here is the part members of council give point and comment
                  about thesis of students
                </p>
                <AssessForm
                  student={studentScheduled?.schedule?.timeSlots[0]?.student}
                  assessStudent={assessStudent}
                />
              </div>
            </div>
          </>
        )}
      </MainboardTemplate>
    </>
  );
}

export default ThesisDefenseStudentDetail;
