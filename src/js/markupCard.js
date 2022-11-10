import cardTpl from '../templates/cardTpl.hbs';
import * as genres from '/src/data/genres.json';
import pictureExample from '../images/coverPlaceholder.jpg';
import { refs } from './refs';
// import * as placeholderPic from '../../images/coverPlaceholder.jpg';

//принимает result с бекенда и возвращает ссылки на превью фильмов (если нет то ставит заглушку)
export function getAvailabilityImage(data) {
  const image = [data].map(item => {
    if (item === null) {
      item = pictureExample;
    } else {
      item = `https://image.tmdb.org/t/p/w500/${item}`;
    }
    return item;
  });
  return image;
}

///проверяет жанры если > 3  обрезает и добавляет Other
export function formateGenres(genresCodeArray, genresObjectArray) {
  const genresNames = genresCodeArray
    ? genresCodeArray.map(convertGenre)
    : genresObjectArray.map(e => e.name);
  if (!genresNames[0]) {
    return 'no genres';
  }
  let slicedGenres = [...genresNames];
  if (genresNames.length > 3) {
    slicedGenres = slicedGenres.slice(0, 2);
    slicedGenres.push(' Other');
  }
  return slicedGenres.join(', ');
}
function convertGenre(genreCode) {
  const genreElement = genres.find(e => e.id == genreCode);

  return genreElement.name;
}

/////////Обрезает дату релиза
export function sliceDateRelease(data) {
  if (!data) {
    return 'no release date';
  }
  return data.slice(0, 4);
}

/////// получает данные с бека и собирает все вместе для рендера
export function getActualData(results) {
  return results.map(
    ({
      poster_path,
      genre_ids,
      genres,
      release_date,
      title,
      id,
      vote_average,
      vote_count,
      original_title,
      overview,
      popularity,
    } = results) => {
      let newResult = {
        id: id,
        poster_path: getAvailabilityImage(poster_path),
        genre_ids: formateGenres(genre_ids, genres),
        release_date: sliceDateRelease(release_date),
        title: title,
        vote_average: vote_averageRound(vote_average),
        overview: overview,
        original_title: original_title,
        vote_count: vote_count,
        popularity: vote_averageRound(popularity),
      };
      return newResult;
    }
  );
}

//////округляет оценку
export function vote_averageRound(vote_average) {
  if (!vote_average) {
    return '-';
  }
  return vote_average.toFixed(1);
}

export function createMarkupCard(results) {
  if (!results[0]) {
    refs.movieCards.innerHTML = `<div class="card-set-wrap">
    <p class="card-set__backgnd-text">Movies not added yet</p>
  </div>`;
  } else {
    refs.movieCards.innerHTML = cardTpl(results);
  }
}

export function createAndRenderMarkup(data) {
  let newData = getActualData(data);
  createMarkupCard(newData);
}
