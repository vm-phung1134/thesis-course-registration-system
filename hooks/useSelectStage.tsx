import { INITIATE_CATEGORY } from "@/data";
import { ICategoryObject } from "@/interface/category";
import { getAllReportStage } from "@/redux/reducer/report-stage/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useSelectStage = () => {
  const [selectedStage, setSelectedStage] =
    useState<ICategoryObject>(INITIATE_CATEGORY);
  const dispatch = useAppDispatch();
  const { data: reportStages } = useQuery<ICategoryObject[]>({
    queryKey: ["reportStages"],
    queryFn: async () => {
      const action = await dispatch(getAllReportStage());
      return action.payload || [];
    },
    initialData: [],
  });
  return {
    selectedStage,
    setSelectedStage,
    reportStages,
  };
};
