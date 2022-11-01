import axios from 'axios';
import * as genres from '/src/data/genres.json';
import { createAndRenderMarkup } from '../markupCard';
import { initPagination } from '../pagination/pagination';
import { spinnerPlay, spinnerStop } from '../spinner';
import { ThemovieAPI } from './APIclass';
import { refs } from '../refs';

/////// /////// /////// /////// ///////

export const themovie = new ThemovieAPI('discover/movie?');

export async function getPopularFilms(params) {
  try {
    spinnerPlay();
    if (localStorage.getItem('page')) {
      themovie.page = localStorage.getItem('page');
    }

    const parced = JSON.stringify(genres);
    const genresFilmData = JSON.parse(parced);

    const data = await themovie.getFilms(params);
    const { results } = data;

    initPagination(data, getPopularFilms);
    createAndRenderMarkup(results);

    //
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop();
  }
}

getPopularFilms();

refs.logo.addEventListener('click', clearLocalStorage);

function clearLocalStorage() {
  localStorage.removeItem('page');
}
