import React, { createContext, useState, ReactNode, useContext } from "react";
import en from "../locales/en.json";
import vi from "../locales/vi.json";
import { useRouter } from "next/router";

interface LanguageContextType {
  t: any;
  handleChangeLanguage: (newLocale: string) => void;
  localeValue: string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Error LanguageContext Provider");
  }
  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const { pathname, locale } = router;
  const [localeValue, setLocaleValue] = useState<string>(locale || "en");
  const t = locale === "en" ? en : vi;

  const handleChangeLanguage = (newLocale: string) => {
    setLocaleValue(newLocale);
    router.push(pathname, pathname, { locale: newLocale });
  };

  const languageContextValue: LanguageContextType = {
    localeValue,
    t,
    handleChangeLanguage,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
