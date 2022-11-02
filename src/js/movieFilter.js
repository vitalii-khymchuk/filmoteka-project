import { ThemovieAPI } from './renderPopularFilm/APIclass';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createAndRenderMarkup } from './markupCard';
import { spinnerPlay, spinnerStop } from './spinner';
import { initPagination } from './pagination/pagination';
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
  saveToLocalStorage(paramsString);
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
    getPageFromLocalStorage();
    clearMarkup();
    spinnerPlay();
    const data = await filterMovie.getFilms();
    spinnerStop();
    createAndRenderMarkup(data.results);
    if (data.results[0]) {
      initPagination(data, updateFilteredItems);
    } else {
      Notify.info(
        'Search result not successful. Enter the correct movie name and try again'
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function getPageFromLocalStorage() {
  if (localStorage.getItem('page')) {
    filterMovie.page = localStorage.getItem('page');
  }
}

function saveToLocalStorage(filterParams) {
  localStorage.setItem('action', 'filter');
  localStorage.setItem('query', filterParams);
  localStorage.setItem('page', 1);
}

export function saveFilterParams(params) {
  filterMovie.params = params;
}

function clearMarkup() {
  refs.movieCards.innerHTML = '';
}
