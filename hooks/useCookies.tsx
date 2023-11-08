import { useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import { IAuthObject } from "@/interface/auth";

export const useUserCookies = (): [
  IAuthObject,
  (user: IAuthObject) => void
] => {
  const [user, setUser] = useState<IAuthObject>({
    id: "",
    email: "",
    name: "",
    photoSrc: "",
    role: "",
  });
  const cookiesUserData = Cookies.get("user");
  useEffect(() => {
    if (cookiesUserData) {
      setUser(JSON.parse(cookiesUserData));
    }
  }, [cookiesUserData]);

  const updateUser = (newUser: IAuthObject) => {
    Cookies.set("user", JSON.stringify(newUser), { expires: 1 });
    setUser(newUser);
  };

  return [user, updateUser];
};
