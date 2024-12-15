document.addEventListener('DOMContentLoaded', async () => {
  const selectEl = document.getElementById('film-category');


  const apiKey = '73d860250c4a6b26e16a2e02ab287042';
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  );
  const data = await response.json();

  // Gelen data'da genres alanında tür listesi bulunuyor
  const genres = data.genres; // Örn: [{id:28, name:"Action"}, {id:12, name:"Adventure"}, ...]

  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.id;
    option.textContent = genre.name;
    selectEl.appendChild(option);
  });
});
