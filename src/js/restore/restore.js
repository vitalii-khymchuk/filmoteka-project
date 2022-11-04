import { getPopularFilms } from '../renderPopularFilm/renderPopFilm';
import { setMovieSearch, updateItems } from '../searchMovieByName';
import { saveFilterParams, updateFilteredItems } from '../movieFilter';
const action = sessionStorage.getItem('action');
const page = sessionStorage.getItem('page');
const query = sessionStorage.getItem('query');

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
