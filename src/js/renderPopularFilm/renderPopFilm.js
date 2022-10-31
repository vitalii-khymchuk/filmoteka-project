import axios from 'axios';
import * as genres from '/src/data/genres.json';
import { createAndRenderMarkup } from '../markupCard';
import { initPagination } from '../pagination/pagination';
import { spinnerPlay, spinnerStop } from '../spinner';
import { initPagination } from '../pagination/pagination';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class ThemovieAPI {
  #api = 'c6849c57578619bd16dafe22e211e348';
  #page = 1;
  #trending = 'trending';
  #movie = 'movie';

  async getFilms() {
    const urlAXIOS = `${this.#trending}/${this.#movie}/day?api_key=${
      this.#api
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
}
/////// /////// /////// /////// ///////

export const themovie = new ThemovieAPI();

export async function getPopularFilms() {
  try {
    spinnerPlay();
    if (localStorage.getItem('page')) {
      themovie.page = localStorage.getItem('page');
    }

    const parced = JSON.stringify(genres);
    const genresFilmData = JSON.parse(parced);

    const data = await themovie.getFilms();
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
