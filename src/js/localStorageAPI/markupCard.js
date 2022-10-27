export function createMarkupCard (results) {
    return results.map(({ 
        title,
        poster_path,
        release_date,
        genre_ids

    }) => {
        return `<div class="film-card">
        <img src="${poster_path}" alt="${title}" loading="lazy"/>
        <div class="info">
                <span class="info-name">${title}</span> <br>
                <span class="info-genre">Genre</span>
                <span class="info-year">Year</span>
            </br>
              
        </div>
    </div>`
    })
    .join('');
    
}