import {
  Avatar,
  Breadcrumb,
  NormalAvatar,
  SnipperRound,
} from "@/components/Atoms";
import { AssessForm } from "@/components/Molecules";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";
import { MainboardTemplate } from "@/components/Templates";
import { useState, useEffect } from "react";

function ThesisDefenseStudentDetail() {
  const [loading, setLoading] = useState<boolean>(true);

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
              <div className="col-span-7 mt-5 flex gap-5 flex-col">
                <div className="p-5 border">
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
                  <h4 className="uppercase text-white py-2 px-3 bg-gradient-to-r from-green-800 to-green-500 text-sm my-2">
                    Thesis defense of student
                  </h4>
                  <div className="px-3">
                    <h5 className="uppercase text-[13px] text-green-700 tracking-wider my-2">
                      Information student
                    </h5>
                    <ul className="flex gap-3 flex-wrap">
                      <li className="flex gap-2">
                        <p className="text-gray-600">Full name:</p>
                        <p className="text-gray-700 font-medium">
                          Vo Minh phung
                        </p>
                      </li>
                      <li className="flex gap-2">
                        <p className="text-gray-600">ID student:</p>
                        <p className="text-gray-700 font-medium">B1910282</p>
                      </li>
                      <li className="flex gap-2">
                        <p className="text-gray-600">Email:</p>
                        <p className="text-gray-700 font-medium">
                          phungb1910282@student.ctu.edu.vn
                        </p>
                      </li>
                    </ul>
                    <h5 className="uppercase text-[13px] text-green-700 tracking-wider my-2">
                      Time defense
                    </h5>
                    <ul className="flex gap-5">
                      <li className="flex gap-2">
                        <p className="text-gray-600">Date report:</p>
                        <p className="text-gray-700 font-medium">11/11/2023</p>
                      </li>
                      <li className="flex gap-2">
                        <p className="text-gray-600">Room:</p>
                        <p className="text-gray-700 font-medium">DI/101</p>
                      </li>
                      <li className="flex gap-2">
                        <p className="text-gray-600">Time:</p>
                        <p className="text-gray-700 font-medium">
                          7:00 - 7:40 AM
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-5 border">
                  <h4 className="uppercase text-white py-2 px-3 bg-gradient-to-r from-green-800 to-green-500 text-sm my-2">
                    Topic searching
                  </h4>
                  <div className="px-3">
                    <h5 className="uppercase text-[13px] text-green-700 tracking-wider my-2">
                      Information topic
                    </h5>
                    <ul className="flex flex-col gap-3">
                      <li className="flex gap-2">
                        <p className="text-gray-600">Name topic:</p>
                        <p className="text-gray-700 font-medium">
                          Build blog website for bussiness
                        </p>
                      </li>
                      <li className="flex gap-2 flex-col">
                        <p className="text-gray-600">File thesis report:</p>
                        <a
                          href="https://console.firebase.google.com/u/0/project/thesis-course-registration"
                          className="font-medium text-blue-600"
                        >
                          https://console.firebase.google.com/u/0/project/thesis-course-registration
                        </a>
                      </li>
                      <li className="flex flex-col gap-2">
                        <p className="text-gray-600">Description:</p>
                        <p className="flex gap-2 flex-col">
                          <span className="text-gray-700">
                            - Create a website allow user CRUD blog
                          </span>
                          <span className="text-gray-700">
                            - Chatbox real time by using socket.io
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-5">
                <h4 className="uppercase mt-5 text-green-700 font-medium tracking-wider">
                  Review from the Dissertation Council
                </h4>
                <div className="mt-5 p-5 border">
                  <div className="flex gap-3 items-center">
                    <p>Examiner 1: </p>
                    <p className="capitalize font-medium">Bui vo quoc bao</p>
                    <NormalAvatar
                      photoSrc="https://cit.ctu.edu.vn/images/cit2023/anh_dai_dien/CNTT/LHQBao.jpg"
                      setSize="w-10"
                    />
                  </div>
                  <span className="italic text-xs font-thin">
                    Noticed: This is part to enter point and assess for examiner
                    to student and grade point follow to 10/10!
                  </span>
                  <div className="mt-2">
                    <AssessForm />
                  </div>
                </div>
                <div className="mt-5 p-5 border">
                  <div className="flex gap-3 mb-2 items-center">
                    <p>Examiner 2: </p>
                    <p className="capitalize font-medium">
                      Le Huynh Bao Quoc
                    </p>{" "}
                    <NormalAvatar
                      photoSrc="https://cit.ctu.edu.vn/images/cit2023/anh_dai_dien/CNTT/LHQBao.jpg"
                      setSize="w-10"
                    />
                  </div>
                  <span className="italic text-xs font-thin">
                    Noticed: This is part to enter point and assess for examiner
                    to student and grade point follow to 10/10!
                  </span>
                  <div className="mt-2">
                    <AssessForm />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </MainboardTemplate>
    </>
  );
}

export default ThesisDefenseStudentDetail;
