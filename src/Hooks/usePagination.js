import { useMemo } from "react";

export const usePagination = ({ itemCount, itemsPerPage, currentPage }) => {
  const pageRange = useMemo(() => {
    const totalPages = Math.ceil(itemCount / itemsPerPage);
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    return [totalPages, previousPage, nextPage, currentPage];
  }, [itemCount, itemsPerPage, currentPage]);
  return pageRange;
};
