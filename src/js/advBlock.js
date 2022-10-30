import { refs } from './refs';

refs.closeAdvBtn.addEventListener('click', closeBtn);

function closeBtn() {
  console.log(123);
  refs.advBlock.remove();
}
