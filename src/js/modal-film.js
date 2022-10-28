const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.js-backdrop'),
};

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
