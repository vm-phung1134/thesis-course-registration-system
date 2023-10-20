import { LearnMoreBtn } from "@/components/Atoms";
import { LogoApp } from "@/components/Molecules";
import { AuthForm } from "@/components/Organisms";
import { AuthTemplate } from "@/components/Templates";
import Image from "next/image";

const IntroPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full px-20">
      <div className="flex gap-5 items-center">
        <Image
          src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
          width="70"
          height="20"
          alt="Logo CTU"
        />
        <h2 className="text-2xl uppercase tracking-wide font-medium text-white">
          The College of Information Technology
        </h2>
      </div>
      <h4 className="uppercase text-[53px] my-3 font-bold text-green-400 tracking-wider leading-[3.5rem]">
        The thesis course registration system
      </h4>
      <div className="flex flex-col gap-10 max-w-2xl">
        <p className="text-base text-gray-100 text-start tracking-wider">
          The thesis course registration system website for students is a useful
          and efficient tool for students to manage and register for their
          theses easily...
        </p>
        <div className="flex justify-end">
          <LearnMoreBtn title="Read More" className="text-blue-400" href="/" />
        </div>
      </div>
    </div>
  );
};

function SignInPage() {
  return (
    <AuthTemplate title="Sign In | Thesis course registration system">
      <div className="grid grid-cols-2 w-full h-screen">
        <div className=" bg-no-repeat bg-cover bg-center bg-[url('https://c4.wallpaperflare.com/wallpaper/520/346/488/geometry-cyberspace-digital-art-lines-wallpaper-preview.jpg')]">
          <div className="bg-black/60 h-screen flex items-center w-full">
            <IntroPage />
          </div>
        </div>
        <div className="flex justify-end items-center w-full bg-white relative">
          {/* <div className="absolute h-52 rounded-bl-full w-20 bg-green-700 top-0 right-0"></div> */}
          {/* <div className="absolute h-32 rounded-bl-full w-20 bg-green-800 top-0 right-20"></div> */}
          {/* <div className="absolute h-20 rounded-tr-full w-20 bg-green-800 bottom-0 left-0"></div> */}
          <div className="w-full px-48 tracking-wide">
            <LogoApp
              width={28}
              height={28}
              className="text-green-700 font-bold text-xl"
            />
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="font-medium mb-10 text-sm">
              Please sign in your account to access the system
            </p>
            <AuthForm />
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
}
export default SignInPage;
