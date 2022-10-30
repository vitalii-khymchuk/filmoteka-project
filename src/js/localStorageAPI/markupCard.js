export function createMarkupCard(results) {
  return results
    .map(({ backdrop_path, genre_ids, release_date, title }) => {
      console.log(backdrop_path);
      console.log();
      return `<div class="film-card">
        <img src="${backdrop_path}" alt="${title}" loading="lazy"/>
        <div class="info">
                <span class="info-name">${title}</span> <br>
                <span class="info-genre">${genre_ids}</span>
                <span class="info-year">${release_date}</span>
            </br>
              
        </div>
    </div>`;
    })
    .join('');
}
