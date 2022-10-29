import modalFilmTpl from '../../templates/mod-film.hbs';
import renderOneFilm from '../../data/one.json';
import { getInfoAboutFilm } from '../localStorageAPI/renderModalFilm';
console.log(modalFilmTpl(renderOneFilm));

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.js-backdrop'),
  modal: document.querySelector('.js-modal'),
};

async function onFilmCardClick(event) {
  try {

    if (event.target.nodeName === 'UL') {
       return;
    }
    toggleModal()
    keyBoardPress()
    onBackdropClick()

    const MovieId = event.target.closest('li').dataset.id;
    //const film = await MovieId.fetchMovieById();
      refs.modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));
    
/*     const watchedModalBtn = document.querySelector('.js-watch');
    const queueModalBtn = document.querySelector('.js-queue');
    const youtubeBtn = document.querySelector('.js-trailer');

    watchedModalBtn.addEventListener('click', onWatchedModalBtnClick);
    queueModalBtn.addEventListener('click', onQueueModalBtnClick);
    youtubeBtn.addEventListener('click', onTrailerBtnClick); */

}

function openBtnClick() {
  toggleModal();
  document.addEventListener('keydown', keyBoardPress);
}
function closeBtnClick() {
  toggleModal();
  document.removeEventListener('keydown', keyBoardPress);
}

function keyBoardPress(event) {
  if (event.key === 'Escape') {
    closeBtnClick();
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeBtnClick();
  }
}

refs.openModalBtn.addEventListener('click', openBtnClick);
refs.closeModalBtn.addEventListener('click', closeBtnClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}
