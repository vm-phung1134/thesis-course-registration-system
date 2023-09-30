import React, { createContext, useState, useContext } from "react";

interface SearchContextProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps>({
  searchValue: "",
  setSearchValue: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
