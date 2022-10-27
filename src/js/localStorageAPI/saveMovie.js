let currentMovieData = {};

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

  addEvtListeners();
}

function addEvtListeners() {
  refs.btn1.addEventListener('click', () => toggleMovie('watched'));
  refs.btn2.addEventListener('click', () => toggleMovie('queue'));
}

function toggleMovie(libName) {
  if (isMovieInStorage(libName)) {
    deleteMovie(libName);
    changeBtn('add to ', libName);
  } else {
    saveMovie(libName);
    changeBtn('delete from ', libName);
  }
}

function isMovieInStorage(libName) {
  localStorage.getItem(libName).some(e => e.id === currentMovieData.id);
}

function changeBtn(btnText, libName) {
  switch (libName) {
    case 'watched':
      refs.btn1.textContent = (btnText + libName).toUpperCase();
    case 'queue':
      refs.btn2.textContent = (btnText + libName).toUpperCase();
  }
}

function saveMovie(libName) {
  const savedMovies = JSON.parse(localStorage.getItem(libName));
  const updSavedMovies = savedMovies.push(currentMovieData);
  localStorage.setItem(libName, JSON.stringify(updSavedMovies));
}

function deleteMovie(libName) {
  const savedMovies = JSON.parse(localStorage.getItem(libName));
  const indexOfMovieToDelete = savedMovies.findIndex(
    e => e.id === currentMovieData.id
  );
  const updSavedMovies = [...savedMovies].splice(indexOfMovieToDelete, 1);
  localStorage.setItem(libName, JSON.stringify(updSavedMovies));
}
