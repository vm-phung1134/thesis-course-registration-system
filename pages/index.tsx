import { LearnMoreBtn } from "@/components/Atoms";
import { AuthForm } from "@/components/Organisms";
import { AuthTemplate } from "@/components/Templates";
import Image from "next/image";

const IntroPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-5">
        <Image
          src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
          width="130"
          height="20"
          alt="Logo CTU"
        />
        <h2 className="max-w-lg font-sans text-3xl uppercase tracking-wide font-bold text-white sm:text-4xl">
          Thesis course registration system for{" "}
          <br className="hidden md:block" />
          <span className="text-green-700">CIT students</span>
        </h2>{" "}
      </div>
      <div className="flex flex-col gap-10 max-w-2xl">
        <p className="text-base text-gray-300 text-start md:text-lg">
          The thesis registration system website for students is a useful and
          efficient tool for students to manage and register for their theses
          easily
        </p>
        <LearnMoreBtn title="Learn more" className="text-blue-400" href="/" />
      </div>
    </div>
  );
};

function SignInPage() {
  return (
    <AuthTemplate title="Account | Thesis course registration system">
      <div className="grid grid-cols-3 w-full h-screen px-32">
        <div className="flex col-span-2 items-center w-full">
          <IntroPage />
        </div>
        <div className="flex justify-end items-center w-full">
          <div className="bg-white rounded-none shadow-2xl p-7 w-full sm:p-10">
            <AuthForm />
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
}
export default SignInPage;
