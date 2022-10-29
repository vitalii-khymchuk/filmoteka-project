import cardTpl from '../templates/cardTpl.hbs';
import pictureExample from '../images/coverPlaceholder.jpg';

export function createMarkupCard (results) {
    if(!results[0]) {
      element.innerHtml = `<img src="${pictureExample}" alt="movie not found"/>`;

    } else {
        element.innerHtml = cardTpl(results);

    }
    
    
}