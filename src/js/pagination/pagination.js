import { themovie } from '../renderPopularFilm/renderPopFilm';
import { movieSearch } from '../searchMovieByName';
import Pagination from 'tui-pagination';
import '../pagination/tui-pagination.css';
import { scrollTo } from '../buttonUp';

const container = document.getElementById('pagination');
export let pagination;

export function initPagination(data, callback) {
  const { page, results, total_results } = data;

  const options = {
    totalItems: total_results,
    itemsPerPage: results.length,
    visiblePages: 5,
    page: page,
    centerAlign: false,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };
  pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;

    themovie.page = currentPage;
    movieSearch.page = currentPage;
    localStorage.setItem('page', currentPage);
    callback();
    scrollTo(0, 400);
  });
}
