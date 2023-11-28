import { IConTitle } from "@/components/Atoms";
import { IExerciseObject } from "@/interface/exercise";
import { FC } from "react";
import { motion } from "framer-motion";
import { convertDateTime } from "@/utils/covertDate";

export interface IExerciseProps {
  exercise: IExerciseObject;
  index: number;
  handleOpenTaskModal: (exercise: IExerciseObject) => void;
}

export const ExerciseCard: FC<IExerciseProps> = ({
  exercise,
  handleOpenTaskModal,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: index * 0.2 }}
      onClick={() => handleOpenTaskModal(exercise)}
      className="bg-slate-100 shadow-md flex mt-5 p-5 rounded-lg justify-between gap-5 text-sm cursor-pointer"
    >
      <IConTitle title={exercise.title} className="truncate font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            className="fill-current text-sky-300 group-hover:text-cyan-300"
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
            clipRule="evenodd"
          />
          <path
            className="fill-current text-sky-600 group-hover:text-cyan-600"
            d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
          />
        </svg>
      </IConTitle>
      <IConTitle
        className="font-normal capitalize "
        title={exercise?.category?.label}
      >
        <svg
          className="w-4 h-4 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
        </svg>
      </IConTitle>
      <IConTitle
        className="textRed-600 text-red-600 text-xs font-medium"
        title={convertDateTime(exercise?.deadline)}
      >
        <svg
          className="w-4 h-4 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </IConTitle>
    </motion.div>
  );
};
