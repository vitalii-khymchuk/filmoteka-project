import axios from 'axios';
import { createTorrentMarkup } from './torrentFilesMarkup';
export function makeQueryForTorrents(query) {
  const options = {
    method: 'GET',
    url: 'https://easytorrents1.p.rapidapi.com/',
    params: { type: 'movie', name: 'Luca', language: 'en', quality: '1080p' },
    headers: {
      'X-RapidAPI-Key': 'b997617050msh5473a309cb32343p12e03ejsn8a9f9850f874',
      'X-RapidAPI-Host': 'easytorrents1.p.rapidapi.com',
    },
  };

  axios.request(options).then(responseHandle).catch(console.error);
}

function responseHandle({ data }) {
  console.log(data);
  const movies = data.data.movies;
  createTorrentMarkup(movies);
}
