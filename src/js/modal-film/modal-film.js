import modalFilmTpl from '../../templates/mod-film.hbs';
import { fetchMovieById } from '../localStorageAPI/render-modal-film';
import { prepareMovieToSaving } from '../localStorageAPI/saveMovie';
import { refs } from '../refs';
import { getActualData } from '../markupCard';

async function onFilmCardClick(event) {
  try {
    if (!event.target.closest('.film-card')) {
      return;
    }

    event.preventDefault();

    toggleModal();
    document.addEventListener('keydown', keyBoardPress);
    onScrollHidden();

    const MovieId = event.target.closest('li').dataset.id;
    const results = await fetchMovieById(MovieId);
    const newResults = getActualData([results]);

    refs.modal.innerHTML = modalFilmTpl(newResults);
    prepareMovieToSaving(newResults);

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

function objTransformInArr(results) {
  newResultsArr = Object.entries(results);
  newResultsArr.forEach(([key, value]) => {
    console.table(key, value);
  });
}

/* function openBtnClick() {
  toggleModal();
  document.addEventListener('keydown', keyBoardPress);
} */
function closeBtnClick() {
  toggleModal();
  document.removeEventListener('keydown', keyBoardPress);
  onScroll();
}

function keyBoardPress(event) {
  if (event.key === 'Escape') {
    closeBtnClick();
    onScroll();
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeBtnClick();
    onScroll();
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

function onScroll() {
  document.body.style.overflow = 'scroll';
}

function onScrollHidden() {
  document.body.style.overflow = 'hidden';
}
