import { spinnerPlay, spinnerStop } from '../spinner';
import YouTubePlayer from 'youtube-player';
import { getTrailer } from './getTrailerAPI';
// import { refs } from './refs';

//позже перенесу в общие когда кнопку прикрутим
const refs = {
  trailerBtn1: document.querySelector('.trailerbtn'),
  trailerBtn: document.querySelector('.js-trailer'),
  backdrop: document.querySelector('.js-backdrop-trailer'),
  backdropFilm: document.querySelector('.js-backdrop'),
  body: document.querySelector('body'),
};

// нужна переменная для получения movieId открытого фильма
let movieId = 49046;

let player;

export function initTrailerListener() {
  refs.trailerBtn.addEventListener('click', onOpenTrailer);
}

export function removeTrailerListener() {
  refs.trailerBtn.removeEventListener('click', onOpenTrailer);
}

//Временная
refs.trailerBtn1.addEventListener('click', onOpenTrailer);

function onOpenTrailer() {
  spinnerPlay();
  refs.body.classList.toggle('no-scroll');
  refs.backdrop.classList.toggle('is-hidden');
  // refs.backdropFilm.classList.toggle('is-hidden');
  onFetchTrailer();
}

async function onFetchTrailer() {
  try {
    const {
      data: { results },
    } = await getTrailer(movieId);

    for (let i = 0; i < results.length; i += 1) {
      if (results[i].type.toLowerCase().includes('trailer')) {
        onLoadPlayer(results[i].key);
        break;
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop();
  }
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
  player = new YouTubePlayer('video-player', {
    videoId: data,
  });
  player.playVideo();
}

function stopVideo() {
  player.stopVideo();
  refs.backdrop.innerHTML =
    '<div class="video-trailer" id="video-player"></div>';
}
