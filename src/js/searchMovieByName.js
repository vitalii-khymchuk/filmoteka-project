import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { createMarkupCard } from './markupCard';
import { getActualData } from './markupCard';
import { refs } from './refs';

let page = 1;
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c6849c57578619bd16dafe22e211e348';

export async function searchMovieByName(name, page) {
  try {
    const response = await axios.get(
      `search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=${page}&include_adult=false`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

async function onSearchSubmit(e) {
  e.preventDefault();
  page = 1;
  const movieName = e.target.elements.searchQuery.value;

  if (movieName !== '') {
    try {
      const result = await searchMovieByName(movieName, page);
      if (result.length !== 0) {
        clearMarkup();
        const results = getActualData(result);
        createMarkupCard(results);
      } else {
        clearMarkup();
        Notify.failure(
          'Search result not successful. Enter the correct movie name and try again'
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    Notify.failure('Please, enter your movie name');
  }
}
refs.searchForm.addEventListener('submit', onSearchSubmit);

function clearMarkup() {
  refs.movieCards.innerHTML = '';
}
