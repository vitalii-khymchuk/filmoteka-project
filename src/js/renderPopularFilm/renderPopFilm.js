import axios from 'axios';
import * as genres from '/src/data/genres.json';
import { createAndRenderMarkup } from '../markupCard';
import { initPagination } from '../pagination/pagination';
import { spinnerPlay, spinnerStop } from '../spinner';
import { initPagination } from '../pagination/pagination';
import { refs } from '../refs';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

//api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc

export class ThemovieAPI {
  #searchParam = 'discover/movie?';
  #api = 'api_key=c6849c57578619bd16dafe22e211e348';
  #lang = '&language=en-US';
  #page = 1;
  #params = '&sort_by=popularity.desc';
  // #trending = 'trending';
  // #movie = 'movie';

  async getFilms() {
    const urlAXIOS = `${this.#searchParam}${this.#api}${this.#lang}${
      this.#params
    }&page=${this.#page}`;

    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  get page() {
    return this.#page;
  }

  set page(newPage) {
    this.#page = newPage;
  }

  get searchParam() {
    return this.#searchParam;
  }

  set searchParam(newSearchParam) {
    this.#searchParam = newSearchParam;
  }

  get params() {
    return this.#params;
  }

  set params(newParams) {
    this.#params = newParams;
  }
}
/////// /////// /////// /////// ///////

export const themovie = new ThemovieAPI();

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
