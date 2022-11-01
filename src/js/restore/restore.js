import { getPopularFilms } from '../renderPopularFilm/renderPopFilm';
import { setMovieSearch, updateItems } from '../searchMovieByName';
const action = localStorage.getItem('action');
const page = localStorage.getItem('page');
const query = localStorage.getItem('query');

export function initRestore() {
  switch (action) {
    case 'search':
      setMovieSearch(query);
      updateItems();
      break;
    default:
      getPopularFilms();
  }
}
