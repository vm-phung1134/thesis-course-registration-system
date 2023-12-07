import { LogoApp } from "@/components/Molecules";
import { AuthForm } from "@/components/Organisms";
import { AuthTemplate } from "@/components/Templates";
import Image from "next/image";
import { motion } from "framer-motion";

const IntroPage = () => {
  const text = "The College of Information Technology";
  const textArray = text.split(" ");
  return (
    <div className="flex flex-col gap-5 w-full px-20">
      <div className="flex gap-5 items-center w-full flex-col">
        <Image
          src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
          width="70"
          height="20"
          alt="Logo CTU"
        />
        <h5 className="text-white font-medium tracking-wide">
          Can Tho University
        </h5>
        <div className="flex gap-3">
          {textArray.map((char, index) => (
            <motion.h2
              key={index}
              className="text-xl w-full uppercase font-medium text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              {char}
            </motion.h2>
          ))}
        </div>
      </div>
      <motion.h4
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="uppercase text-[53px] my-3 font-bold text-green-400 tracking-wider leading-[3.5rem] text-center"
      >
        The thesis course registration system
      </motion.h4>
      <div className="flex flex-col gap-10 max-w-2xl">
        <p className="text-sm text-gray-100 text-start tracking-wider">
          The thesis course registration system website for students is a useful
          and efficient tool for students to manage and register for their
          theses easily ...
        </p>
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <button className="btn normal-case bg-transparent text-orange-500 border-none hover:bg-transparent hover:border-none">
            <p>Read more</p>
          </button>
        </motion.div>
        <div className="flex justify-end">
          <div className="flex gap-5">
            <button className="flex items-center gap-3 bg-black text-white px-6 py-2 rounded-xl">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/6124/6124997.png"
                width={30}
                height={30}
                alt=""
              />
              <p className="flex flex-col text-[13px] items-start">
                <span className="text-[10px] tracking-wider font-medium">
                  Get it on
                </span>
                <span className="font-bold">Google Play</span>
              </p>
            </button>
            <button className="flex  items-center gap-3 bg-black text-white px-6 py-2 rounded-xl">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/5977/5977575.png"
                width={30}
                height={30}
                alt=""
              />
              <p className="flex flex-col text-[13px]">
                <span className="text-[10px] tracking-wider font-medium">
                  Download on the
                </span>
                <span className="font-bold">App Store</span>
              </p>
            </button>
          </div>
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
