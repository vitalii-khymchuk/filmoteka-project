import cardTpl from '../templates/cardTpl.hbs';
import pictureExample from '../images/coverPlaceholder.jpg';

const listCardsRef = document.querySelector('.card-set');

export function createMarkupCard(results) {
  if (!results[0]) {
    listCardsRef.innerHtml = `<img src=${pictureExample} alt="movie not found"/>`;
  } else {
    listCardsRef.innerHTML = cardTpl(results);
  }

  console.log(listCardsRef);
}
