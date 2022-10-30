import { Spinner } from 'spin.js';
import YouTubePlayer from 'youtube-player';
import { getTrailer } from './getTrailerAPI';
// import { refs } from './refs';

// const spinner = new Spinner(opts).spin(refs.spinner);

//позже перенесу в общие когда кнопку прикрутим
const refs = {
  trailerBtn: document.querySelector('.trailerbtn'),
  backdrop: document.querySelector('.js-backdrop-trailer'),
  backdropFilm: document.querySelector('.js-backdrop'),
  body: document.querySelector('body'),
};

// нужна переменная для получения movieId открытого фильма
let movieId = 436270;

let player;

async function onFetchTrailer() {
  try {
    const {
      data: { results },
    } = await getTrailer(movieId);

    for (let i = 0; i < results.length; i += 1) {
      if (
        results[i].type.toLowerCase().includes('trailer') ||
        results[i].type.toLowerCase().includes('teaser')
      ) {
        onLoadPlayer(results[i].key);
      }
      continue;
    }
  } catch (error) {
    console.log(error);
  } finally {
    // spinnerStop();
  }
}

refs.trailerBtn.addEventListener('click', onSearchTrailer);

function onSearchTrailer() {
  // spinnerStart();
  refs.body.classList.toggle('no-scroll');
  refs.backdrop.classList.toggle('is-hidden');
  // refs.backdropFilm.classList.toggle('is-hidden');
  onFetchTrailer();
}

refs.backdrop.addEventListener('click', onCloseTrailer);
// document.addEventListener('keydown', onCloseTrailer);

function onCloseTrailer(event) {
  refs.body.classList.toggle('no-scroll');
  refs.backdrop.classList.toggle('is-hidden');
  // refs.backdropFilm.classList.toggle('is-hidden');
  stopVideo();
}

function onLoadPlayer(data) {
  player = YouTubePlayer('video-player', {
    videoId: data,
  });
  player.playVideo();
}

function stopVideo() {
  player.stopVideo();
}
