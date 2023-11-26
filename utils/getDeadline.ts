import { IExerciseObject } from "@/interface/exercise";

export function getExerciseWithNearestDeadline(
  exercises: IExerciseObject[]
): IExerciseObject | null {
  if (exercises.length === 0) {
    return null;
  }

  const currentDate = Date.now();
  let nearestDeadlineExercise: IExerciseObject | null = null;
  let nearestDeadline: number | null = null;

  for (let i = 0; i < exercises.length; i++) {
    const currentExercise = exercises[i];
    const currentDeadline = new Date(
      currentExercise.deadline.year,
      currentExercise.deadline.month - 1,
      currentExercise.deadline.day,
      currentExercise.deadline.hours,
      currentExercise.deadline.minutes,
      currentExercise.deadline.seconds
    ).getTime();

    if (
      currentDeadline >= currentDate &&
      (nearestDeadline === null || currentDeadline < nearestDeadline)
    ) {
      nearestDeadlineExercise = currentExercise;
      nearestDeadline = currentDeadline;
    }
  }
  return nearestDeadlineExercise;
}
