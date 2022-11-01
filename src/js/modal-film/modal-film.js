import modalFilmTpl from '../../templates/mod-film.hbs';
import { fetchMovieById } from '../modal-film/render-modal-film';
import { prepareMovieToSaving } from '../localStorageAPI/saveMovie';
import { refs } from '../refs';
import { getActualData } from '../markupCard';
import { initTrailerListener, removeTrailerListener } from '../trailer/trailer';
import { spinnerPlay, spinnerStop } from '../spinner';

async function onFilmCardClick(event) {
  spinnerPlay();
  try {
    if (!event.target.closest('.film-card')) {
      return;
    }

    event.preventDefault();

    toggleModal();
    document.addEventListener('keydown', keyBoardPress);
    onScrollHidden();

    const movieId = event.target.closest('li').dataset.id;

    const results = await fetchMovieById(movieId);
    const newResults = getActualData([results]);

    refs.modalBody.innerHTML = modalFilmTpl(newResults[0]);
    prepareMovieToSaving(results);
    initTrailerListener(movieId);
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop();
  }
}

function closeBtnClick() {
  toggleModal();
  document.removeEventListener('keydown', keyBoardPress);
  onScroll();
  removeTrailerListener();
  onClearModalWindow();
}

function keyBoardPress(event) {
  if (
    refs.backdropTrailer.classList.contains('is-hidden') &&
    event.key === 'Escape'
  ) {
    closeBtnClick();
    onScroll();
    removeTrailerListener();
    onClearModalWindow();
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeBtnClick();
    onScroll();
    removeTrailerListener();
    onClearModalWindow();
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

function onClearModalWindow() {
  refs.modalBody.innerHTML = '';
}
