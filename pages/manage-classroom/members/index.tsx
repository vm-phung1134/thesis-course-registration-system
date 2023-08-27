import { Avatar } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import Link from "next/link";

function MemberTab() {
  return (
    <MainboardTemplate title="Manage Class | Thesis course registration system">
      <div className="grid grid-cols-12 gap-4 py-5">
        <div className="col-span-4 p-5 border">
          <h3 className="text-md uppercase">Thesis graduation - CT550</h3>
          <h4 className="text-[26px] font-semibold uppercase">
            Le Huynh Quoc Bao
          </h4>
          <h5 className="font-medium text-green-700">
            Major: Sercurity Information
          </h5>
          <ul>
            <li className="text-base flex gap-2">
              <span className="">lhqbao@ctu.edu.vn</span>
            </li>
            <li className="text-base flex gap-2">
              <span className="">0953812461</span>
            </li>
          </ul>
          <div className="flex justify-end items-end">
            <button className="btn rounded-none bg-transparent border-red-500 text-red-600 font-normal capitalize">
              Leave Group
            </button>
          </div>
        </div>
        <div className="bg-gray-800 col-span-8 h-fit w-full text-white">
          <div className="p-5">
            <ul className="flex gap-10 mb-10 text-base font-medium justify-center">
              <li>
                <Link
                  className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                  href="/"
                >
                  Newfeeds
                </Link>
              </li>
              <li>
                <Link
                  className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                  href="/"
                >
                  Report progress
                </Link>
              </li>
              <li>
                <Link
                  className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                  href="/"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  className="hover:white text-white hover:bg-transparent relative after:absolute after:bg-white 
                    after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500
                    cursor-pointer py-1"
                  href="/"
                >
                  Point
                </Link>
              </li>
            </ul>
            <div className="flex justify-center mt-5 gap-4 items-center">
              <Avatar
                widthStr="w-10"
                srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <p>Write a message for your class today</p>
            </div>
            <div className="flex justify-center flex-col items-end">
              <div className="border w-fit p-2">
                <div className="flex justify-between items-center">
                  <small>Code</small>
                  <button>...</button>
                </div>
                <p className="font-medium text-md px-5 py-2">zggbvj3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h4 className="uppercase text-md py-5">List students</h4>
          <select className="select font-normal select-sm select-bordered rounded-none focus:outline-none max-w-xs">
            <option>Sort by name A-Z</option>
            <option>Large Apple</option>
            <option>Large Orange</option>
            <option>Large Tomato</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <CardStudent name="vo minh phung" />
          <CardStudent name="Nguyen quang thuy" />
          <CardStudent name="chu kha hieu" />
          <CardStudent name="Le thi tuyet nhu" />
        </div>
      </div>
    </MainboardTemplate>
  );
}

const CardStudent = ({ name }: { name: string }) => {
  return (
    <div className="p-3 border shadow-lg">
      <div className="flex gap-4 items-center">
        <Avatar
          online={true}
          widthStr="w-10 h-10"
          srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <div className="flex flex-col text-sm">
          <p className="uppercase font-medium">{name}</p>
          <p>DI19V7A7</p>
          <p>Information technology</p>
        </div>
      </div>
      <div className="py-1">
        <p className="text-[15px] py-2">Topic: Build Blog App</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 pt-2">
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-regular fa-message"></i>
          </div>
          <button className="text-green-600 text-sm">View detail</button>
        </div>
      </div>
    </div>
  );
};

export default MemberTab;
