import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { createAndRenderMarkup } from './markupCard';
import { spinnerPlay, spinnerStop } from './spinner';
import { ThemovieAPI } from './renderPopularFilm/APIclass';
import { initPagination } from './pagination/pagination';
import { refs } from './refs';

export let movieSearch;

export function initSearchMovie() {
  movieSearch = new ThemovieAPI('search/movie?');
  refs.searchForm.addEventListener('submit', onSearchSubmit);
}

async function onSearchSubmit(e) {
  e.preventDefault();
  const movieName = e.target.elements.searchQuery.value;
  movieSearch.params = `&query=${movieName}`;
  if (movieName !== '') {
    updateItems();
  } else {
    Notify.failure('Please, enter your movie name');
  }
}

async function updateItems() {
  try {
    clearMarkup();
    spinnerPlay();
    const data = await movieSearch.getFilms();
    spinnerStop();
    if (data.results.length !== 0) {
      createAndRenderMarkup(data.results);
      initPagination(data, updateItems);
    } else {
      createMarkupCard([]);
      Notify.failure(
        'Search result not successful. Enter the correct movie name and try again'
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function clearMarkup() {
  refs.movieCards.innerHTML = '';
}
