import { Button, SnipperRound } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import Image from "next/image";
import { useState, useEffect } from "react";

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
            <p className="font-thin text-sm">
              Please waiting until the lecturer add you into class
            </p>
            <span className="loading loading-dots loading-md text-green-700"></span>
            <Button
              title="Unsubcribe"
              className="px-5 bg-green-700 text-white"
            />
          </div>
        </div>
      )}
    </MainboardTemplate>
  );
}

export default SubscribeCourseDetail;
