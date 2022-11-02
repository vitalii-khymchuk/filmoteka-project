import { getPopularFilms } from '../renderPopularFilm/renderPopFilm';
import { setMovieSearch, updateItems } from '../searchMovieByName';
import { saveFilterParams, updateFilteredItems } from '../movieFilter';
const action = localStorage.getItem('action');
const page = localStorage.getItem('page');
const query = localStorage.getItem('query');

export function initRestore() {
  switch (action) {
    case 'search':
      setMovieSearch(query);
      updateItems();
      break;
    case 'filter':
      saveFilterParams(query);
      updateFilteredItems();
      break;
    default:
      getPopularFilms();
  }
}
