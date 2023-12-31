import { motion } from "framer-motion";
export const SnipperRound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full relative top-[40%] bg-white flex justify-center items-center"
    >
      <svg className="loading-round" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </motion.div>
  );
};
