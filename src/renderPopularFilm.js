import axios from 'axios';

const refs = {};

axios.defaults.baseURL = 'https://api.themoviedb.org/3/trending/movie';

export class ThemovieAPI {
  #api = 'c6849c57578619bd16dafe22e211e348';
  #total_pages = '';
  #total_results = '';
  #page = 4;

  async getFilms() {
    const urlAXIOS = `day?api_key=${this.#api}&page=${this.#page}`;

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
    ///spinner

    const data = await themovieApi.getFilms();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPopularFilms();
