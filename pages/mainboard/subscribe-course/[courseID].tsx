import { Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BREADCRUMB_MAINBOARD } from "../mock-data";

function SubscribeCourseDetail() {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <MainboardTemplate title="Subcribed | Thesis couse registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
          <div className="flex gap-2 justify-center items-center min-h-[70%] max-h-full">
            <Image
              src="https://tailwindcomponents.com/svg/queue-animate.svg"
              alt="bg-create-class"
              width="300"
              height="300"
              className="-hue-rotate-[38deg] saturate-[.85]"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="flex gap-3 flex-col items-center">
              <h4 className="">
                You subscribed classroom of{" "}
                <span className="uppercase font-medium">Le huynh quoc bao</span>
              </h4>
              {/* <p className="font-thin text-sm">
                Please waiting until the lecturer add you into class
              </p> */}
              <p className="font-thin text-sm">
                <span className="font-medium">Congratulation </span>! You have been added into class
              </p>
              {/* <span className="loading loading-dots loading-md text-green-700"></span> */}
              <div className="flex gap-3">
                <Button
                  title="Unsubcribe"
                  className="px-5 bg-transparent hover:bg-transparent hover:border-none border-none"
                />
                <Button
                  title="Go to your class"
                  className="px-5 bg-green-700 text-white hover:bg-green-600"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </MainboardTemplate>
  );
}

export default SubscribeCourseDetail;
