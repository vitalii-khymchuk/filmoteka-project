import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = 'c6849c57578619bd16dafe22e211e348';
let movieId = 1;

function getMovieID() {
  const refs = {
    movieId: document.querySelectorAll(),
  };

  return movieId;
}

export async function getInfoAboutFilm() {
  try {
    const urlAXIOS = `movie/${movieId}?${API_KEY}&language=en-US`;

    const { data } = await axios.get(urlAXIOS);

    return data;
  } catch (error) {
    console.log(error);
  }
}
