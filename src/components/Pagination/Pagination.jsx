import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({ total_items, total_pages, per_page, onChangePage }) {
  console.log(total_items);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={per_page}
      pageCount={total_pages}
      renderOnZeroPageCount={null}
    />
  );
}
export default Pagination;
