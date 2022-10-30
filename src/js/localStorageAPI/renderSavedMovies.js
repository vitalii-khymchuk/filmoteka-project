import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getSavedMovies } from './saveMovie';
import { createAndRenderMarkup } from '../markupCard';

const refs = {
  watchedBtn: document.querySelector('.watchedBtn'),
  queueBtn: document.querySelector('.queueBtn'),
};

refs.watchedBtn.addEventListener('click', onWatchedBtnHandler);
refs.queueBtn.addEventListener('click', onQueueBtnHandler);

//Callbacks of buttons event listeners
export function onWatchedBtnHandler() {
  renderSavedMovies('watched');
  switchActiveBtn(refs.watchedBtn, refs.queueBtn);
}

export function onQueueBtnHandler() {
  renderSavedMovies('queue');
  switchActiveBtn(refs.queueBtn, refs.watchedBtn);
}
//////////////////////////////////////////////////////////

//add class to active button and remove from not active
function switchActiveBtn(activeBtn, notActiveBtn) {
  activeBtn.classList.add('active');
  notActiveBtn.classList.remove('active');
}
//////////////////////////////////////////////////////

//call function that create markup with data from local storage
function renderSavedMovies(libName) {
  const data = getSavedMovies(libName);
  if (!data[0]) {
    Notify.info(`You have'nt added any movies to ${libName}`);
    return;
  }
  createAndRenderMarkup(data);
}
/////////////////////////////////////////////////////////
