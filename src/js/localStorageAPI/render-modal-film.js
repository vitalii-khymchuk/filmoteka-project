import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = 'c6849c57578619bd16dafe22e211e348';

export async function fetchMovieById(movieId) {
  try {
    //spinner start
    const urlAXIOS = `movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const { data } = await axios.get(urlAXIOS);
    //spinner stop
    return data;
  } catch (error) {
    console.log(error);
  }
}
