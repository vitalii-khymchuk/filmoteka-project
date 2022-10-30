import cardTpl from '../templates/cardTpl.hbs';
import pictureExample from '../images/coverPlaceholder.jpg';

const refs = {

  listCards: document.querySelector('.card-set'),

}

export function createMarkupCard(results) {
  if (!results[0]) {
    refs.listCards.innerHtml = `<img src=${pictureExample} alt="movie not found"/>`;
  } else {
    refs.listCards.innerHTML = cardTpl(results);
  }
}
