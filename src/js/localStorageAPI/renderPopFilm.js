import axios from 'axios';
import * as genres from '/src/data/genres.json';
import { createMarkupCard } from './markupCard';
import * as placeholderPic from '../../images/coverPlaceholder.jpg';

const refs = {
  listCardRef: document.querySelector('.card-set'),
};

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
    const parced = JSON.stringify(genres);
    const genresFilmData = JSON.parse(parced);

    const { results } = await themovieApi.getFilms();

    let newData = getActualData(results);

    let markup = createMarkupCard(newData);

    renderCars(refs.listCardRef, markup);
    //
  } catch (error) {
    console.log(error);
  }
}

getPopularFilms();

//принимает result с бекенда и возвращает ссылки на превью фильмов (если нет то ставит заглушку)
export function getAvailabilityImage(data) {
  const image = [data].map(item => {
    if (item === null) {
      item = placeholderPic;
    } else {
      item = `https://image.tmdb.org/t/p/w500/${item}`;
    }
    return item;
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
  return [data].map(item => {
    return item.slice(0, 4);
  });
}

/////// получает данные с бека и собирает все вместе для рендера
export function getActualData(results) {
  return results.map(
    ({
      backdrop_path,
      genre_ids,
      release_date,
      title,
      id,
      vote_average,
    } = results) => {
      let newResult = {
        id: id,
        backdrop_path: getAvailabilityImage(backdrop_path),
        genre_ids: formateGenres(genre_ids),
        release_date: sliceDateRelease(release_date),
        title: title,
        vote_average: vote_averageRound(vote_average),
      };
      return newResult;
    }
  );
}

//////округляет оценку
export function vote_averageRound(vote_average) {
  return [vote_average].map(item => {
    return item.toFixed(1);
  });
}

/////renderCards

export function renderCars(referense, markup) {
  referense.innerHTML = markup;
}
