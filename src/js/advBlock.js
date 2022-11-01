import { refs } from './refs';

refs.closeAdvBtn.addEventListener('click', closeBtn);

function closeBtn() {
  refs.advBlock.remove();
}
