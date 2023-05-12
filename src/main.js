const axiosAPI = axios.create({
  baseURL : 'https://api.themoviedb.org/3/',
  headers :{
    'Content-Type' : 'application/json',
  },
  params: {
    'api_key': API_KEY,
  },

});

function createMovies(movies,container){

  container.innerHTML = '';

  movies.forEach(movie => {

    const div = document.createElement('div');
    div.classList.add('movie-container');

    const img = document.createElement('img');
    img.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
    img.classList.add('movie-img');
    img.setAttribute('alt', movie.title);

    div.appendChild(img);
    container.appendChild(div);

  });



}

function createCategories(categories, container){
  container.innerHTML = '';


  categories.forEach(category =>{

    const div = document.createElement('div');
    div.classList.add('category-container');

    const h3 = document.createElement('h3');
    h3.setAttribute('id', 'id' + category.id);
    h3.classList.add('category-title');
    h3.innerText = category.name;

    h3.addEventListener('click',()=>{
      location.hash = `#category=${category.id}-${category.name}`;
    });

    div.appendChild(h3);
    container.appendChild(div);

  });


}

async function getTrendingMoviesPreview(){
  const {data} = await axiosAPI('trending/movie/day');
  
  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoryMoviesPreview(){
  const {data} = await axiosAPI('genre/movie/list');

  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);

}

async function getMoviesByCategory(id){
  const {data} = await axiosAPI('discover/movie',{
    params:{
      with_genres: id,
    },
  });
  
  const movies = data.results;

  createMovies(movies, genericSection);

}
async function getMoviesBySearch(query){
  const {data} = await axiosAPI('search/movie',{
    params:{
      query,
    },
  });
  
  const movies = data.results;

  createMovies(movies, genericSection);

}

