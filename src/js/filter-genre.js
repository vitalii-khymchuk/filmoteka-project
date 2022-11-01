function app() {
  const buttons = document.querySelectorAll('.button');
  const cards = document.querySelectorAll('.film-card');

  function filter(category, items) {
    console.log(items);
    items.forEach(item => {
      //если инфа из класса film-card__genre содержит data-filter, то показывать картточку

      const textCategory = span.querySelectorAll('.film-card__genre');

      const isItemFiltered = !item.textCategory.textContent.includes(category);
      const isShowAll = category.toLowerCase() === 'all';
      console.log(textCategory, isItemFiltered, isShowAll);
      if (isItemFiltered && !isShowAll) {
        item.classList.add('hide');
      } else {
        item.classList.remove('hide');
      }
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const currentCategory = button.dataset.filter;
      filter(currentCategory, cards);
    });
  });
}

app();
