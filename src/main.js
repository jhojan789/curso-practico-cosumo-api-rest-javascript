const axiosAPI = axios.create({
  baseURL : 'https://api.themoviedb.org/3/',
  headers :{
    'Content-Type' : 'application/json',
  },
  params: {
    'api_key': API_KEY,
  },

});

async function getTrendingMoviesPreview(){
  const {data} = await axiosAPI('trending/movie/day');
  
  const movies = data.results;
  const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
  movies.forEach(movie => {
    trendingMoviesPreviewList.innerHTML+= 
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

async function getCategoryMoviesPreview(){
  const {data} = await axiosAPI('genre/movie/list');

  const categories = data.genres;
  const categoriesPreviewList = document.querySelector('.categoriesPreview-list');

  categories.forEach(category =>{
    categoriesPreviewList.innerHTML+=
    `
      <div class="category-container">
        <h3 id="id${category.id}" class="category-title">${category.name}</h3>
      </div>
    `
  });

}





