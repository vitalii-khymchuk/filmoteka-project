import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { createMarkupCard } from './markupCard';
import { getActualData } from './markupCard';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  cardset: document.querySelector('.card-set'),
};
console.dir(refs.searchForm);
console.log(refs.cardset);
let page = 1;
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c6849c57578619bd16dafe22e211e348';

export async function searchMovieByName(name, page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=c6849c57578619bd16dafe22e211e348&language=en-US&query=${name}&page=${page}&include_adult=false`
    );
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

function onSearchSubmit(e) {
  e.preventDefault();
  page = 1;
  const movieName = e.currentTarget.searchQuery.value;
  console.log(movieName);
}

// if (response !== '') {
//   try {
//     const result = await searchMovieByName(response, page);

//     if (result.length !== 0) {
//       console.log(result);
//     } else {
//       Notify.failure('error');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// } else {
//   Notify.failure('errrrr');
// }

refs.searchForm.addEventListener('submit', onSearchSubmit);
