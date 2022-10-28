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

    //     //    //
    let imageCard = getAvailabilityImage(results);

    //     //    //
    let title = results.map(item => {
      return item.title;
    });

    //     //    //
    let releaseDate = sliceDateRelease(results);

    ///////// жанры по имени  ////
    let genresName = results.map(item => formateGenres(item.genre_ids));

    //
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
export function formateGenres(genresCodeArray) {
  const genresNames = genresCodeArray.map(convertGenre);
  let slicedGenres = [...genresNames];
  if (genresNames.length > 3) {
    slicedGenres = slicedGenres.slice(0, 2);
    slicedGenres.push('Other');
  }
  return slicedGenres;
}
function convertGenre(genreCode) {
  const genreElement = genres.find(e => e.id == genreCode);
  return genreElement.name;
}

/////////Обрезает дату релиза
export function sliceDateRelease(data) {
  return data.map(item => {
    return item.release_date.slice(0, 4);
  });
}
