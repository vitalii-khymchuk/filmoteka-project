import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { makeQueryForTorrents } from '../torrentAPI/getTorrentLinks';
import movieData from '../../data/one.json';
export { prepareMovieToSaving, getSavedMovies, removeEventListeners };

const refs = {
  btn1: document.querySelector('.btn1'),
  btn2: document.querySelector('.btn2'),
};

let currentMovieData = {};

//this function convert and save data to variable in correct format
function prepareMovieToSaving(data) {
  const {
    adult,
    backdrop_path,
    genres,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = data;

  const genre_ids = genres.map(genre => genre.id);

  currentMovieData = {
    adult: adult,
    backdrop_path: backdrop_path,
    genre_ids: genre_ids,
    id: id,
    original_language: original_language,
    original_title: original_title,
    overview: overview,
    popularity: popularity,
    poster_path: poster_path,
    release_date: release_date,
    title: title,
    video: video,
    vote_average: vote_average,
    vote_count: vote_count,
  };

  // addEvtListeners();
  // changeBtnName('watched');
  // changeBtnName('queue');
  makeQueryForTorrents(currentMovieData.original_title);
}
////////////////////////////////////////////////////////////////////////////////////////////

//this call other functions (that save or delete movie from local storage ),
//depends on available this movie in loc storage
function toggleMovie(libName) {
  if (isMovieInStorage(libName)) {
    deleteMovie(libName);
    changeBtnName(libName);
  } else {
    saveMovie(libName);
    changeBtnName(libName);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////

//check if current movie in storage by comparating id of all movies in loc storage with
// id of movie that we are trying to save
function isMovieInStorage(libName) {
  const savedMovies = getSavedMovies(libName);
  if (!savedMovies) {
    localStorage.setItem(libName, '[]');
    return false;
  }
  return savedMovies.some(e => e.id === currentMovieData.id);
}
//////////////////////////////////////////////////////////////////////////////////////

//change btn name (foe example delete movie to add movie)
function changeBtnName(libName) {
  const partOfName = isMovieInStorage(libName) ? 'delete from ' : 'add to ';

  switch (libName) {
    case 'watched':
      refs.btn1.textContent = (partOfName + libName).toUpperCase();
      return;
    case 'queue':
      refs.btn2.textContent = (partOfName + libName).toUpperCase();
      return;
  }
}
//////////////////////////////////////////////////////////////////////////////////////

//get data from local storage, add new movie and save new data
function saveMovie(libName) {
  const savedMovies = getSavedMovies(libName);
  savedMovies.push(currentMovieData);
  rewriteLocStorage(libName, savedMovies);
  Notify.info(
    `"${currentMovieData.original_title}" has added to your ${libName}`
  );
  //createMarkupCard(savedMovies);
}
//////////////////////////////////////////////////////////////////////////////

//get data from local storage, delete movie and save new data
function deleteMovie(libName) {
  const savedMovies = getSavedMovies(libName);
  const indexOfMovieToDelete = savedMovies.findIndex(
    e => e.id === currentMovieData.id
  );
  savedMovies.splice(indexOfMovieToDelete, 1);
  rewriteLocStorage(libName, savedMovies);
  Notify.info(
    `"${currentMovieData.original_title}" has removed from your ${libName}`
  );
  //createMarkupCard(savedMovies);
}
///////////////////////////////////////////////////////////////////////////

// get saved movie from local storage
function getSavedMovies(libName) {
  return JSON.parse(localStorage.getItem(libName));
}
////////////////////////////////////////////////////////////////

//put new data to local storage
function rewriteLocStorage(libName, data) {
  localStorage.setItem(libName, JSON.stringify(data));
}
///////////////////////////////////////////////////////////////////////////

function addEvtListeners() {
  refs.btn1.addEventListener('click', () => toggleMovie('watched'));
  refs.btn2.addEventListener('click', () => toggleMovie('queue'));
}

function removeEventListeners() {
  refs.btn1.replaceWith(refs.btn1.cloneNode(true));
  refs.btn2.replaceWith(refs.btn2.cloneNode(true));
}

prepareMovieToSaving(movieData);
toggleMovie('watched');
