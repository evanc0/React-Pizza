import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({ currentPage, total_items, total_pages, per_page, onChangePage }) {
  return (
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
    />
  );
}
export default Pagination;
