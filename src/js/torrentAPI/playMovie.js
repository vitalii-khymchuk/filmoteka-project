import axios from 'axios';
import { refs } from '../refs';
import { initTorrentPlayer } from './initTorrentPlayer';

let query = '';

function getMagnetLink(quality) {
  console.log(query);
  console.log(quality);
  const options = {
    method: 'GET',
    url: 'https://easytorrents1.p.rapidapi.com/',
    params: {
      type: 'movie',
      name: query,
      language: 'en',
      quality: quality,
    },
    headers: {
      'X-RapidAPI-Key': '386699d10amsh78cca4aa5c144a8p1d6c8ejsn2ff1454f49e3',
      'X-RapidAPI-Host': 'easytorrents1.p.rapidapi.com',
    },
  };

  axios.request(options).then(responseHandle).catch(console.error);
}

function responseHandle({ data }) {
  console.log(data);
  const magnetLink = data.magnet_link;
  createVideoPlayer();
  initTorrentPlayer(magnetLink);
}

function createVideoPlayer() {
  refs.movieContainer.innerHTML = `
          <div id="player" class="webtor"></div>
      `;
}

export function prepareToStreaming(movieName) {
  query = movieName;
  defineLinks();
  addEventListeners();
}

function defineLinks() {
  refs.watchOnlineButtons = document.querySelector('.watchOnlineButtons');
  refs.movieContainer = document.querySelector('.movieContainer');
}

function addEventListeners() {
  refs.watchOnlineButtons.addEventListener('click', onWatchBtnClick);
  refs.movieContainer.addEventListener('click', onCloseMovieBtn);
  document.addEventListener('keydown', onCloseMovieBtn);
}

function onWatchBtnClick(evt) {
  if (!evt.target.closest('.qualityBtn')) {
    return;
  }
  const quality = evt.target.dataset.quality;
  refs.movieContainer.classList.remove('is-hidden');
  refs.modal.classList.add('is-hidden');
  getMagnetLink(quality);
}

function onCloseMovieBtn(evt) {
  if (evt.target !== refs.movieContainer && evt.key !== 'Escape') {
    return;
  }
  refs.modal.classList.remove('is-hidden');
  refs.movieContainer.classList.add('is-hidden');
  refs.movieContainer.innerHTML = '';
}

export function removeMowieEventListeners() {
  refs.watchOnlineButtons.removeEventListener('click', onWatchBtnClick);
  refs.backdrop.removeEventListener('click', onCloseMovieBtn);
  document.removeEventListener('keydown', onCloseMovieBtn);
}
