import { useDebounce } from "@uidotdev/usehooks";
import { useState, useCallback, useEffect } from "react";

export function useTableSearch<T>(initialData: T[]) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [filteredData, setFilteredData] = useState<T[]>(initialData);
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setFilteredData(
        initialData?.filter((entry) =>
          Object.values(entry as any).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
        )
      );
    },
    [debouncedSearchTerm, initialData]
  );

  useEffect(() => {
    handleSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, handleSearch]);

  return {
    handleSearch,
    filteredData,
  };
}
