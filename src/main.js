const axiosAPI = axios.create({
  baseURL : 'https://api.themoviedb.org/3/',
  headers :{
    'Content-Type' : 'application/json',
  },
  params: {
    'api_key': API_KEY,
  },

});

/* Utils */

const lazyLoader = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    // console.log({entry});

    if(entry.isIntersecting){

      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url);
      // console.log(entry.target);:
    }

  });
});


function createMovies(movies,container, lazyLoad = false){

  container.innerHTML = '';

  movies.forEach(movie => {

    const div = document.createElement('div');
    div.classList.add('movie-container');

    const img = document.createElement('img');
    
    img.setAttribute(
      lazyLoad ? 'data-img' : 'src',
      'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
    img.classList.add('movie-img');
    img.setAttribute('alt', movie.title);
    img.addEventListener('click',()=>{
      location.hash = '#movie=' + movie.id;
    });

    img.addEventListener('error',()=>{
      img.setAttribute('src', 'https://http.cat/404');
    });

    if(lazyLoad) {
      lazyLoader.observe(img);

    }
    
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
  createMovies(movies, trendingMoviesPreviewList,true);
}

async function getCategoryMoviesPreview(){
  const {data} = await axiosAPI('genre/movie/list');

  const categories = data.genres;

  createCategories(categories, categoriesPreviewList,true);

}

async function getMoviesByCategory(id){
  const {data} = await axiosAPI('discover/movie',{
    params:{
      with_genres: id,
    },
  });
  
  const movies = data.results;

  createMovies(movies, genericSection,true);

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

async function getTrendingMovies(){
  const {data} = await axiosAPI('trending/movie/day');
  const movies = data.results;
  createMovies(movies, genericSection);

}

async function getMovieById(id){
  const {data: movie} = await axiosAPI('movie/' + id);
  console.log(movie);
  movieDetailTitle.innerHTML = movie.title;
  movieDetailDescription.innerHTML = movie.overview;
  movieDetailScore.innerHTML = movie.vote_count;
  
  const urlImg = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
  
  headerSection.style.background = `
  linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), 
  url(${urlImg})`;
  
  createCategories(movie.genres, movieDetailCategoriesList);
  
  getRelatedMoviesById(id);
  
}

async function getRelatedMoviesById(id){
  const {data} = await axiosAPI(`movie/${id}/recommendations`);
  const relatedMovies = data.results;
  
  createMovies(relatedMovies,relatedMoviesContainer);
  console.log(relatedMovies);


}