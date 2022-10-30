import modalFilmTpl from '../../templates/mod-film.hbs';
import { fetchMovieById } from '../localStorageAPI/render-modal-film';

const refs = {
  openModalBtn: document.querySelector('.film-card'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.js-backdrop'),
  modal: document.querySelector('.js-modal'),
};



async function onFilmCardClick(event) {
  const { target } = event;
  console.log(target);
  try {
    if(target.nodeName === 'UL') {
      return;
    }

    toggleModal();
    document.addEventListener('keydown', keyBoardPress);
    //document.body.style.overflow = 'scroll';
    closeBtnClick()
    keyBoardPress()
    onBackdropClick()

    const MovieId = target.closest('li').dataset.id;
    //console.log(MovieId);
    const { results } = await MovieId.fetchMovieById();
    refs.modal.insertAdjacentHTML('afterbegin', modalFilmTpl(results));

/*     const watchedModalBtn = document.querySelector('.js-watch');
    const queueModalBtn = document.querySelector('.js-queue');
    const youtubeBtn = document.querySelector('.js-trailer');

    watchedModalBtn.addEventListener('click', onWatchedModalBtnClick);
    queueModalBtn.addEventListener('click', onQueueModalBtnClick);
    youtubeBtn.addEventListener('click', onTrailerBtnClick); */
  } catch (error) {
    console.log(error);
  }

/* function openBtnClick() {
  toggleModal();
  document.addEventListener('keydown', keyBoardPress);
} */
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
  
refs.openModalBtn.addEventListener('click', onFilmCardClick);
refs.closeModalBtn.addEventListener('click', closeBtnClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}