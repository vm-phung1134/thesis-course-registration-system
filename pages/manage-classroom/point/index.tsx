import { ClassroomTemplate } from "@/components/Templates";
import { getOnePointDef } from "@/redux/reducer/point-def/api";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { IMemberObject } from "@/interface/member";
import { IAssessItem, IPointDefObject } from "@/interface/pointDef";
import { INITIATE_POINT_DEF } from "@/data";
import { NormalAvatar } from "@/components/Atoms";
import { ICouncilDef } from "@/interface/schedule";
import { getScheduleForStudent } from "@/redux/reducer/schedule-def/api";
import Image from "next/image";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { calculatorGPA, calculatorLetterPoint } from "@/utils/calculatorPoint";

function PointDefTab() {
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const { data: studPoint } = useQuery<IPointDefObject>({
    queryKey: ["point-student", currentUser],
    queryFn: async () => {
      const action = await dispatch(getOnePointDef(currentUser));
      return action.payload || INITIATE_POINT_DEF;
    },
    initialData: INITIATE_POINT_DEF,
  });
  const { data: studentScheduled } = useQuery<ICouncilDef>({
    queryKey: ["studentScheduled", currentUser.id],
    queryFn: async () => {
      const action = await dispatch(getScheduleForStudent(currentUser.id));
      return action.payload || {};
    },
  });
  return (
    <ClassroomTemplate title="Point thesis defense | Thesis course registration system">
      {studPoint?.id ? (
        <div className="py-10">
          <h4 className="font-bold text-lg text-green-700">
            Results of the thesis defense process
          </h4>
          <div className="grid grid-cols-9 gap-5 text-sm tracking-wider my-5">
            <div className="col-span-4 py-2 px-4 bg-slate-50 rounded-xl">
              <h5 className="text-green-700 my-2 font-medium">Your schedule</h5>
              <div>
                <ul className="flex justify-between">
                  <li>
                    <p className="text-gray-500">Date defense</p>
                    <p>
                      {studentScheduled?.schedule?.timeSlots[0]?.timeSlot?.date}
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-500">Take place</p>
                    <p>CNTT</p>
                  </li>
                  <li>
                    <p className="text-gray-500">Room</p>
                    <p>{studentScheduled?.schedule?.room.name}</p>
                  </li>
                  <li>
                    <p className="text-gray-500">Time</p>
                    <p>
                      {studentScheduled?.schedule?.timeSlots[0]?.timeSlot?.time}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 py-2 px-4 bg-slate-50 rounded-xl">
              <h5 className="text-green-700 my-2 font-medium">
                Information student
              </h5>
              <div>
                <ul className="flex justify-between">
                  <li>
                    <p className="text-gray-500">Name</p>
                    <p>{currentUser?.name}</p>
                  </li>
                  <li>
                    <p className="text-gray-500">Major</p>
                    <p>{currentUser?.major}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-2 border-l-2 p-2">
              <h5 className="text-green-700 my-2 font-medium">Result</h5>
              <ul>
                <li className="flex gap-3">
                  <span className="text-gray-500">GPA:</span>{" "}
                  <span className="font-medium text-red-600">
                    {calculatorGPA(studPoint?.assesses)}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-500">Letters Point:</span>
                  <span>
                    {calculatorLetterPoint(
                      parseFloat(calculatorGPA(studPoint?.assesses))
                    )}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-500">Rating:</span>
                  <span>Good</span>
                </li>
              </ul>
            </div>
          </div>
          <h5 className="font-medium my-3 ">Evaluation from board members</h5>
          <div className="grid grid-cols-3 gap-3">
            {studPoint?.assesses?.map((council, index) => (
              <div
                key={council?.lecturer?.id}
                className="shadow-xl overflow-hidden relative w-full rounded-xl px-5 py-4 flex flex-col justify-center"
              >
                <div className="absolute top-3 right-3">
                  <NormalAvatar
                    photoSrc={council?.lecturer.photoSrc}
                    setSize="w-10"
                  />
                </div>
                <div className="relative flex flex-col">
                  <p className="text-base font-semibold">
                    <span className="capitalize font-bold text-sm">
                      {council?.lecturer?.name}
                    </span>
                  </p>
                  <div className="text-sm flex flex-col gap-1">
                    <p>{council?.lecturer?.email}</p>
                    <p>
                      <span className="text-gray-500">Grade: </span>
                      <span className="text-red-500 font-bold">
                        {council?.point} / 10
                      </span>
                    </p>
                    <div>
                      <span className="text-gray-500">Comments: </span>
                      <ul className="indent-2">
                        <li>{council?.comment}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-60 flex flex-col justify-center items-center p-5">
          <Image
            src="https://yi-files.s3.eu-west-1.amazonaws.com/products/794000/794104/1354385-full.jpg"
            width="250"
            height="250"
            className="-hue-rotate-[38deg] saturate-[.85]"
            alt=""
          />
          <p className="uppercase text-sm text-green-700">
            Ops! Your result will be updated after report
          </p>
        </div>
      )}
    </ClassroomTemplate>
  );
}

export default PointDefTab;
