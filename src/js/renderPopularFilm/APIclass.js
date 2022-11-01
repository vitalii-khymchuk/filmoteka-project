import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export class ThemovieAPI {
  #api = 'api_key=c6849c57578619bd16dafe22e211e348';
  #lang = '&language=en-US';

  constructor(searchParam) {
    this.searchParam = searchParam;
    this.page = 1;
    this.params = '&sort_by=popularity.desc';
  }

  // #trending = 'trending';
  // #movie = 'movie';

  async getFilms() {
    const urlAXIOS = `${this.searchParam}${this.#api}${this.#lang}${
      this.params
    }&page=${this.page}`;

    const { data } = await axios.get(urlAXIOS);
    return data;
  }
}
