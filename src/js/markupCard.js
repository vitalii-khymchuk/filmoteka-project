import cardTpl from '../templates/cardTpl.hbs';

export function createMarkupCard (results) {
    element.innerHtml = cardTpl(results)
    
}