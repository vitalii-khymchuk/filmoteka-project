import { ThemovieAPI } from './renderPopularFilm/APIclass';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createAndRenderMarkup } from './markupCard';
import { spinnerPlay, spinnerStop } from './spinner';
import { initPagination, destroyPagination } from './pagination/pagination';
import { refs } from './refs';

let filterMovie;

function onFilterSubmit(evt) {
  evt.preventDefault();
  const genre = evt.target.genre.value;
  const sort = evt.target.sort.value;
  const yearStart = evt.target.yearStart.value;
  const yearEnd = evt.target.yearEnd.value;
  const paramsString = makeParamString({
    genre: genre,
    sortBy: sort,
    yearFrom: yearStart,
    yearTo: yearEnd,
  });
  saveFilterParams(paramsString);
  saveToSessionStorage(paramsString);
  updateFilteredItems();
}

export function initFilter() {
  refs.headerForm.addEventListener('submit', onFilterSubmit);
  filterMovie = new ThemovieAPI('discover/movie?');
}

function makeParamString({ genre, yearFrom, yearTo, sortBy }) {
  return `&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31&with_genres=${genre}&sort_by=${sortBy}`;
}

export async function updateFilteredItems() {
  try {
    getPageFromSessionStorage();
    clearMarkup();
    spinnerPlay();
    const data = await filterMovie.getFilms();
    createAndRenderMarkup(data.results);
    if (data.results[0]) {
      initPagination(data, updateFilteredItems);
    } else {
      destroyPagination();
      Notify.info(
        'Movies not found by your request. Enter other parameters and try again'
      );
    }
  } catch (error) {
    createAndRenderMarkup([]);
    console.log(error);
  } finally {
    spinnerStop();
  }
}

function getPageFromSessionStorage() {
  if (sessionStorage.getItem('page')) {
    filterMovie.page = sessionStorage.getItem('page');
  }
}

function saveToSessionStorage(filterParams) {
  sessionStorage.setItem('action', 'filter');
  sessionStorage.setItem('query', filterParams);
  sessionStorage.setItem('page', 1);
}

export function saveFilterParams(params) {
  filterMovie.params = params;
}

function clearMarkup() {
  refs.movieCards.innerHTML = '';
}
