import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { createAndRenderMarkup } from './markupCard';
import { spinnerPlay, spinnerStop } from './spinner';
import { ThemovieAPI } from './renderPopularFilm/APIclass';
import { initPagination } from './pagination/pagination';
import { refs } from './refs';
import { initRestore } from './restore/restore';

export let movieSearch;

export function initSearchMovie() {
  movieSearch = new ThemovieAPI('search/movie?');
  refs.searchForm.addEventListener('submit', onSearchSubmit);
  initRestore();
}

async function onSearchSubmit(e) {
  e.preventDefault();
  const movieName = e.target.elements.searchQuery.value;
  saveToLocalStorage(movieName);
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
      Notify.info(
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

function saveToLocalStorage(movieName) {
  localStorage.setItem('action', 'search');
  localStorage.setItem('query', `&query=${movieName}`);
  localStorage.setItem('page', 1);
}

function getPageFromLocalStorage() {
  if (localStorage.getItem('page')) {
    movieSearch.page = localStorage.getItem('page');
  }
}

export function setMovieSearch(movieName) {
  movieSearch.params = `&query=${movieName}`;
}
