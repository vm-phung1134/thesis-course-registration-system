/* eslint-disable @next/next/no-img-element */
import { NormalAvatar, SnipperRound } from "@/components/Atoms";
import { FC, useEffect, useState } from "react";
import { IClassroomObject } from "@/interface/classroom";
import { motion } from "framer-motion";
import { useLanguageContext } from "@/contexts/languageContext";
import Link from "next/link";

export interface IUnSubscribeViewProps {
  classroom: IClassroomObject | null;
}

export const UnSubscribeView: FC<IUnSubscribeViewProps> = ({ classroom }) => {
  const { t } = useLanguageContext();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      {loading ? (
        <SnipperRound />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed h-[100vh] w-full pt-10"
        >
          <div className="relative h-fit">
            <div className="absolute -top-28 bottom-0 -left-5 -right-40">
              <div className="bg-gradient-to-t from-green-900 to-green-500">
                <img
                  src="https://wildrift.leagueoflegends.com/static/volt-bottom-04-56cf6b160f445315e4c6a87da5bc5f23.png"
                  alt="bg-create-class"
                  className="bg-no-repeat w-[84vw] h-[100vh] bg-cover transform rotate-180 dark:bg-[#141E37]"
                />
              </div>
            </div>
          </div>
          <div className="relative left-3 dark:text-[#141E37]">
            <div className="flex justify-between">
              <div className="flex justify-between w-9/12">
                <div className="w-96 relative h-fit">
                  <motion.h4
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="uppercase text-[50px] text-[#141E37] italic font-bold leading-snug pl-8"
                  >
                    {t.unsub_title1}
                  </motion.h4>
                  <span className="absolute top-3 bottom-3 w-1 bg-[#141E37]"></span>
                  <span className="absolute top-3 -left-1 h-14 w-3 bg-[#141E37]"></span>
                </div>
                <div className="flex gap-5 w-fit items-center px-5 relative h-fit">
                  <NormalAvatar
                    photoSrc={classroom?.lecturer?.photoSrc || ""}
                    setSize="w-32"
                  />
                  <div className="font-normal">
                    <h4 className="font-bold text-2xl uppercase">
                      {classroom?.lecturer?.name}
                    </h4>
                    <p>{t.unsub_title2}</p>
                    <p className="capitalize">{classroom?.lecturer?.major}</p>
                    <p>{classroom?.lecturer?.email}</p>
                    <div className="flex gap-3 pt-2">
                      <i className="fa-regular fa-envelope"></i>
                      <i className="fa-regular fa-message"></i>
                    </div>
                  </div>
                  <span className="absolute top-0 -bottom-2 left-0 w-[2px] bg-[#141E37]"></span>
                  <span className="absolute left-0 -bottom-2 right-1/3 h-[3px] bg-[#141E37]"></span>
                  <span className="absolute left-0 -bottom-3 right-[80%] h-1 bg-[#141E37]"></span>
                </div>
              </div>
            </div>
            <p className="mt-10">
              <span className="font-medium">Congratulation </span>! You have
              been added into classroom.
            </p>
            <p className="text-sm w-96 py-2 font-thin ">
              Remember, after a period of time the instructor may lock the
              classroom, please consider carefully whether to continue with the
              instructor to avoid unnecessary risks. Moreover, You can leave the
              group during this time.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <Link href={"/manage-classroom"}>
                <button className="ml-5 mt-5 py-3 px-8 bg-green-700 dark:bg-[#141E37] hover:bg-[#141E37] transform ease-linear duration-300 text-white uppercase font-medium -skew-x-[20deg]">
                  <p className="skew-x-12">Go to classroom</p>
                </button>
              </Link>
            </motion.div>
            <div className="flex justify-end absolute right-[23rem] top-[20rem] text-gray-100">
              <div className="w-[26rem]">
                <h4 className="font-bold mb-3">
                  Information you need to know when participating in class:
                </h4>
                <div className="collapse collapse-arrow bg-transparent">
                  <input type="checkbox" name="my-accordion-2" />
                  <div className="collapse-title text-sm font-bold ">
                    Classroom rules
                  </div>
                  <div className="collapse-content">
                    <p className="text-xs">
                      Accordion is used for showing and hiding content but only
                      one item can stay open at a time.
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-transparent">
                  <input type="checkbox" name="my-accordion-2" />
                  <div className="collapse-title text-sm font-bold">
                    Instructions for registering points I
                  </div>
                  <div className="collapse-content">
                    <p className="text-xs">
                      Accordion is used for showing and hiding content but only
                      one item can stay open at a time.
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-transparent">
                  <input type="checkbox" name="my-accordion-2" />
                  <div className="collapse-title text-sm font-bold">
                    How to register for reports
                  </div>
                  <div className="collapse-content">
                    <p className="text-xs">
                      Accordion is used for showing and hiding content but only
                      one item can stay open at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
