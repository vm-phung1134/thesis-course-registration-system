import { useDebounce } from "@uidotdev/usehooks";
import { useState, useCallback, useEffect } from "react";

export function useTableSearch<T>(initialData: T[]) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [filteredData, setFilteredData] = useState<T[]>(initialData);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  useEffect(() => {
    const searchInObject = (obj: any): boolean => {
      for (const key in obj) {
        const value = obj[key];
        if (
          typeof value === "string" &&
          value.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        ) {
          return true;
        }
        if (typeof value === "object" && searchInObject(value)) {
          return true;
        }
      }
      return false;
    };

    const filtered = initialData?.filter((entry) => searchInObject(entry));
    setFilteredData(filtered || []);
  }, [debouncedSearchTerm, initialData]);

  return {
    handleSearch,
    filteredData,
  };
}
