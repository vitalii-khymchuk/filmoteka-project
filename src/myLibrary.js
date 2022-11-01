import { refs } from './js/refs';
import { getSavedMovies } from './js/localStorageAPI/saveMovie';
import { createAndRenderMarkup } from './js/markupCard';
import { initModal } from './js/modal-film/modal-film';
import './js/advBlock';
import './js/buttonUp';
import './js/footer-modal';

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  changeActiveBtn(refs.watchedBtn, refs.queueBtn);
  renderSavedMovies('watched');
  initModal();
}

function onQueueBtnClick() {
  changeActiveBtn(refs.queueBtn, refs.watchedBtn);
  renderSavedMovies('queue');
  initModal();
}

function changeActiveBtn(btn1, btn2) {
  btn1.classList.add('active');
  btn2.classList.remove('active');
}

function renderSavedMovies(libName) {
  const savedMovies = getSavedMovies(libName);
  createAndRenderMarkup(savedMovies);
}

onWatchedBtnClick();
