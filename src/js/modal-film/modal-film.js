import modalFilmTpl from '../../templates/mod-film.hbs';
import { fetchMovieById } from '../localStorageAPI/render-modal-film';

const refs = {
  movieCards: document.querySelector('.card-set'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.js-backdrop'),
  modal: document.querySelector('.js-modal'),
};

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
    const { results } = await fetchMovieById(MovieId);
    console.log(results);
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

refs.movieCards.addEventListener('click', onFilmCardClick);
refs.closeModalBtn.addEventListener('click', closeBtnClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}
