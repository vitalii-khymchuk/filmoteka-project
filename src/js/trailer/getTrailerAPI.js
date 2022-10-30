import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c6849c57578619bd16dafe22e211e348';

export async function getTrailer(movieId) {
  try {
    return await axios.get(
      `movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
  } catch (error) {
    console.log(error);
  }
}
