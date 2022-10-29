import axios from 'axios';
import { createTorrentMarkup } from './torrentFilesMarkup';
export function makeQueryForTorrents(query) {
  const options = {
    method: 'GET',
    url: `https://movies-and-serials-torrent.p.rapidapi.com/movies/search/${query}`,
    headers: {
      'X-RapidAPI-Key': 'aa70bf373cmsh53640cedb8c24b9p1b6742jsn6542bfef771f',
      'X-RapidAPI-Host': 'movies-and-serials-torrent.p.rapidapi.com',
    },
  };

  axios.request(options).then(responseHandle).catch(console.error);
}

function responseHandle({ data }) {
  const movies = data.data.movies;
  createTorrentMarkup(movies);
}
