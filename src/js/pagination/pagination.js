import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('pagination');
let pagination;

export function initPagination(data) {
  const { page, results, total_results } = data;

  const options = {
    totalItems: total_results,
    itemsPerPage: results.length,
    visiblePages: 5,
    page: page,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };
  pagination = new Pagination(container, options);
}
