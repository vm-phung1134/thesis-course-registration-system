import { IExerciseObject } from "@/interface/exercise";
import Cookies from "js-cookie";

export interface ExerciseState {
  exercises: IExerciseObject[];
  exercise: IExerciseObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
