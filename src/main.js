
async function getTrendingMoviesPreview(){
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
  const data = await res.json();
  const movies = data.results;
  const trendingPreview = document.querySelector('.trendingPreview-movieList');
  movies.forEach(movie => {
      trendingPreview.innerHTML+= 
      `
      <div class="movie-container">
      <img
        src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
        class="movie-img"
        alt=${movie.title}
      />
    </div>
    `;
  });

}

getTrendingMoviesPreview();