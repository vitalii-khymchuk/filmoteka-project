import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createAndRenderMarkup } from './markupCard';
import { spinnerPlay, spinnerStop } from './spinner';
import { ThemovieAPI } from './renderPopularFilm/APIclass';
import { initPagination, destroyPagination } from './pagination/pagination';
import { refs } from './refs';

export let movieSearch;

export function initSearchMovie() {
  movieSearch = new ThemovieAPI('search/movie?');
  refs.searchForm.addEventListener('submit', onSearchSubmit);
}

async function onSearchSubmit(e) {
  e.preventDefault();
  const movieName = e.target.elements.searchQuery.value;
  saveToSessionStorage(movieName);
  setMovieSearch(movieName);
  if (movieName !== '') {
    updateItems();
  } else {
    Notify.failure('Please, enter your movie name');
  }
}

export async function updateItems() {
  try {
    getPageFromLocalStorage();
    clearMarkup();
    spinnerPlay();
    const data = await movieSearch.getFilms();
    spinnerStop();
    createAndRenderMarkup(data.results);
    if (data.results[0]) {
      initPagination(data, updateItems);
    } else {
      destroyPagination();
      Notify.info(
        'Search result not successful. Enter the correct movie name and try again'
      );
    }
  } catch (error) {
    spinnerStop();
    createAndRenderMarkup([]);
    console.log(error);
  }
}

function clearMarkup() {
  refs.movieCards.innerHTML = '';
}

function saveToSessionStorage(movieName) {
  sessionStorage.setItem('action', 'search');
  sessionStorage.setItem('query', `&query=${movieName}`);
  sessionStorage.setItem('page', 1);
}

function getPageFromLocalStorage() {
  if (sessionStorage.getItem('page')) {
    movieSearch.page = sessionStorage.getItem('page');
  }
}

export function setMovieSearch(movieName) {
  movieSearch.params = `&query=${movieName}`;
}
