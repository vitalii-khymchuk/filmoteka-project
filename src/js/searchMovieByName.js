import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { createAndRenderMarkup } from './markupCard';
import { spinnerPlay, spinnerStop } from './spinner';
import { ThemovieAPI } from './renderPopularFilm/renderPopFilm';
import { initPagination } from './pagination/pagination';
import { refs } from './refs';

export let movieSearch;

export function initSearchMovie() {
  movieSearch = new ThemovieAPI();
  refs.searchForm.addEventListener('submit', onSearchSubmit);
  movieSearch.searchParam = 'search/movie?';
}

// let page = 1;
// axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
// const API_KEY = 'c6849c57578619bd16dafe22e211e348';

// export async function searchMovieByName(name, page) {
//   try {
//     const response = await axios.get(
//       `search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=${page}&include_adult=false`
//     );
//     return response.data.results;
//   } catch (error) {
//     console.error(error);
//   }
// }

async function onSearchSubmit(e) {
  e.preventDefault();
  const movieName = e.target.elements.searchQuery.value;
  movieSearch.search = `&query=${movieName}`;

  if (movieName !== '') {
    try {
      clearMarkup();
      spinnerPlay();
      const result = await movieSearch.getFilms();
      spinnerStop();
      if (result.length !== 0) {
        createAndRenderMarkup(result);
        initPagination(result, movieSearch.getFilms());
      } else {
        createMarkupCard([]);
        Notify.failure(
          'Search result not successful. Enter the correct movie name and try again'
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    Notify.failure('Please, enter your movie name');
  }
}

function clearMarkup() {
  refs.movieCards.innerHTML = '';
}
