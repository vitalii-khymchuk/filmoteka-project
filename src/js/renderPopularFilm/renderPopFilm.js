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
    if (sessionStorage.getItem('page')) {
      themovie.page = sessionStorage.getItem('page');
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

// getPopularFilms();

refs.logo.addEventListener('click', resetSessionStorage);

function resetSessionStorage() {
  sessionStorage.setItem('action', 'popular');
  sessionStorage.setItem('page', 1);
  sessionStorage.setItem('query', '');
}
