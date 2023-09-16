import { FC } from "react";

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

export const Pagination: FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          <a className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">
            Prev
          </a>
        </button>
        <li>
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
          >
            {currentPage}
          </a>
        </li>
        <li aria-current="page">
          <a
            className="relative block rounded px-3 py-1.5 text-sm font-medium transition-all duration-300"
            href="#!"
          >
            {currentPage + 1}
          </a>
        </li>
        <li>
          <a
            className="relative block rounded px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
          >
            {currentPage + 2}
          </a>
        </li>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          <a
            className="relative block rounded px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
          >
            Next
          </a>
        </button>
      </ul>
    </nav>
  );
};
