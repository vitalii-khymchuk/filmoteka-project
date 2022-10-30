import modalFilmTpl from '../../templates/mod-film.hbs';
import { fetchMovieById } from '../localStorageAPI/render-modal-film';
import { prepareMovieToSaving } from '../localStorageAPI/saveMovie';
import { refs } from '../refs';

async function onFilmCardClick(event) {
  try {
    if (!event.target.closest('.film-card')) {
      return;
    }

    event.preventDefault();

    toggleModal();
    document.addEventListener('keydown', keyBoardPress);
    //document.body.style.overflow = 'scroll';

    const MovieId = event.target.closest('li').dataset.id;
    const results = await fetchMovieById(MovieId);
    refs.modal.insertAdjacentHTML('afterbegin', modalFilmTpl(results));
    prepareMovieToSaving(results);

    /*     const watchedModalBtn = document.querySelector('.js-watch');
        const queueModalBtn = document.querySelector('.js-queue');
        const youtubeBtn = document.querySelector('.js-trailer');
    
        watchedModalBtn.addEventListener('click', onWatchedModalBtnClick);
        queueModalBtn.addEventListener('click', onQueueModalBtnClick);
        youtubeBtn.addEventListener('click', onTrailerBtnClick); */
  } catch (error) {
    console.log(error);
  }
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

export function initModal() {
  refs.movieCards.addEventListener('click', onFilmCardClick);
  refs.closeModalBtn.addEventListener('click', closeBtnClick);
  refs.backdrop.addEventListener('click', onBackdropClick);
}

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}
