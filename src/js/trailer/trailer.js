import { spinnerPlay, spinnerStop } from '../spinner';
import YouTubePlayer from 'youtube-player';
import { getTrailer } from './getTrailerAPI';
import { refs } from '../refs';

let exportedMovieId = 0;
let player;

// refs.backdropTrailer.classList.contains('is-hidden') &&

export function initTrailerListener(movieId) {
  exportedMovieId = movieId;
  refs.trailerBtn = document.querySelector('.js-trailer');
  refs.trailerBtn.addEventListener('click', onOpenTrailer);
}

export function removeTrailerListener() {
  refs.trailerBtn.removeEventListener('click', onOpenTrailer);
}

function onOpenTrailer() {
  spinnerPlay();
  refs.backdropTrailer.classList.remove('is-hidden');
  onFetchTrailer(exportedMovieId);
  refs.backdropTrailer.addEventListener('click', onCloseTrailer);
  document.addEventListener('keydown', onEscCloseTrailer);
}

async function onFetchTrailer(movieId) {
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

function onCloseTrailer(event) {
  refs.backdropTrailer.classList.add('is-hidden');
  stopVideo();
}

function onEscCloseTrailer(event) {
  setTimeout(() => {
    if (event.key === 'Escape') {
      onCloseTrailer();
    }
  }, 50);
}

function onLoadPlayer(data) {
  player = new YouTubePlayer('video-player', {
    videoId: data,
  });
  player.playVideo();
}

function stopVideo() {
  player.stopVideo();
  refs.backdropTrailer.innerHTML =
    '<div class="video-trailer" id="video-player"></div>';
  refs.backdropTrailer.removeEventListener('click', onCloseTrailer);
  document.removeEventListener('keydown', onEscCloseTrailer);
}
