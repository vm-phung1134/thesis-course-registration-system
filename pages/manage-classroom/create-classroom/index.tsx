import { CreateClassroomForm, InforUserFormV2 } from "@/components/Molecules";
import { MainboardTemplate } from "@/components/Templates";
import Image from "next/image";
import { useState } from "react";

function CreateClassroomPage() {
  const [switchingForm, setSwitchingForm] = useState<number>(1);
  return (
    <MainboardTemplate title="Create classroom">
      <div className="grid grid-cols-2">
        <div className="w-full mx-[-20px]">
          <Image
            src="https://tailwindcomponents.com/svg/secure-login-animate.svg"
            alt="bg-create-class"
            width="1000"
            height="100"
            className="-hue-rotate-[38deg] saturate-[.85]"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="flex h-full items-center">
          <div className="p-5 border w-[70%] shadow-xl">
            <h3 className="text-xs mb-3">Step {switchingForm} of 2</h3>
            {switchingForm === 1 ? (
              <InforUserFormV2
                setSwitchingForm={setSwitchingForm}
                switchingForm={switchingForm}
              />
            ) : (
              <CreateClassroomForm
                setSwitchingForm={setSwitchingForm}
                switchingForm={switchingForm}
              />
            )}
          </div>
        </div>
      </div>
    </MainboardTemplate>
  );
}

export default CreateClassroomPage;
