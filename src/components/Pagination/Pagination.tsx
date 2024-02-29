import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import React from "react";

type PaginationProps = {
  currentPage: number;
  total_items: number;
  total_pages: number;
  per_page: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total_items,
  total_pages,
  per_page,
  onChangePage,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={per_page}
    pageCount={total_pages}
    forcePage={currentPage - 1}
    renderOnZeroPageCount={null}
    activeLinkClassName={styles.selected}
  />
);
