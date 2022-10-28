import axios from 'axios';
import * as genres from '/src/data/genres.json';

const refs = {};

axios.defaults.baseURL = 'https://api.themoviedb.org/3/trending/movie';

export class ThemovieAPI {
  #api = 'c6849c57578619bd16dafe22e211e348';
  #total_pages = '';
  #total_results = '';
  #page = 1;

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
    const parced = JSON.stringify(genres);
    const genresFilmData = JSON.parse(parced);

    const { results } = await themovieApi.getFilms();

    //
    let imageCard = getAvailabilityImage(results);

    let title = results.map(item => {
      return item.title;
    });

    /////////
    let genresCardId = checkAndReturnGenres(results);

    ////жанр=имени

    console.log(genresCardId);

    console.log(genresFilmData);

    //

    let releaseDate = sliceDateRelease(results);
    ///
  } catch (error) {
    console.log(error);
  }
}

getPopularFilms();

//принимает result с бекенда и возвращает ссылки на превью фильмов (если нет то ставит заглушку)
export function getAvailabilityImage(data) {
  const image = data.map(item => {
    if (item.backdrop_path === null) {
      item.backdrop_path = './images/coverPlaceholder.jpg';
    } else {
      item.backdrop_path = `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`;
    }
    return item.backdrop_path;
  });
  return image;
}

///проверяет жанры если > 3  обрезает и добавляет Other
export function checkAndReturnGenres(data) {
  const genres = data.map(item => {
    if (item.genre_ids.length > 3) {
      item.genre_ids = item.genre_ids.slice(0, 4);
    }
    return item.genre_ids;
  });

  let genresOnCardFilter = genres.map(item => {
    if (item.length > 3) {
      item[3] = 'Other';
    }
    return item;
  });
  return genresOnCardFilter;
}

/////////Обрезает дату релиза
export function sliceDateRelease(data) {
  return data.map(item => {
    return item.release_date.slice(0, 4);
  });
}
