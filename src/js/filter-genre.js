document.querySelector('.header__form').addEventListener('submit', event => {
  // event.preventDefault();
  const form = document.querySelector('.header__form');

  console.dir(form.elements.genre.value);
  console.dir(form.elements.sort.value);
  console.dir(form.elements.yearStart.value);
  console.dir(form.elements.yearEnd.value);
});

for (let yearStart = 1920; yearStart <= 2035; yearStart++) {
  let options = document.createElement('OPTION');
  document.getElementById('yearStart').appendChild(options).innerHTML =
    yearStart;
}

for (let yearEnd = 1920; yearEnd <= 2035; yearEnd++) {
  let options = document.createElement('OPTION');
  document.getElementById('yearEnd').appendChild(options).innerHTML = yearEnd;
}
