import axios from 'axios';
import * as genres from '/src/data/genres.json';
import {
  createMarkupCard,
  getActualData,
  createAndRenderMarkup,
} from '../markupCard';

import { spinnerPlay, spinnerStop } from '../spinner';

const refs = {
  listCardRef: document.querySelector('.card-set'),
};

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class ThemovieAPI {
  #api = 'c6849c57578619bd16dafe22e211e348';
  #total_pages = '';
  #total_results = '';
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

  incrementPage() {
    this.#page += 1;
  }

  decrementPage() {
    this.#page = 1;
  }
}
/////// /////// /////// /////// ///////

const themovieApi = new ThemovieAPI();

async function getPopularFilms() {
  try {
    spinnerPlay();
    const parced = JSON.stringify(genres);
    const genresFilmData = JSON.parse(parced);

    const { results } = await themovieApi.getFilms();
    console.log(results);

    createAndRenderMarkup(results);

    //
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop();
  }
}

getPopularFilms();
