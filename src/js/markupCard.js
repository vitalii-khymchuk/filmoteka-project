import cardTpl from '../templates/cardTpl.hbs';

export function createMarkupCard (results) {
    return results.map(cardTpl)
    .join('');
    
}