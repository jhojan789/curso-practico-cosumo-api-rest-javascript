let maxPage;
let page = 1;
let infiniteScroll;

window.addEventListener('DOMContentLoaded', navigator,false);
window.addEventListener('hashchange', navigator,false);
window.addEventListener('scroll',infiniteScroll, {passive: false});

searchFormBtn.addEventListener('click', ()=>{
  location.hash = '#search='  + searchFormInput.value;
});

trendingBtn.addEventListener('click', ()=>{
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', ()=>{
  history.back();
  // location.hash = '#home=';
});

function navigator(){

  if(infiniteScroll){
    window.removeEventListener('scroll',infiniteScroll);
    infiniteScroll = undefined;
  }

  if(location.hash.startsWith('#trends')){
    trendsPage();
  }else if(location.hash.startsWith('#search=')){
    searchPage();
  }else if(location.hash.startsWith('#movie=')){
    movieDetailsPage();
  }else if(location.hash.startsWith('#category=')){
    categoriesPage();
  }else{
    homePage();
  }

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  // window.scrollTo(0,0);

  if(infiniteScroll){
    window.addEventListener('scroll', infiniteScroll,{passive: false});

  }
}

function homePage(){
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  
  trendingPreviewSection.classList.remove('inactive');
  
  categoriesPreviewSection.classList.remove('inactive');
  
  genericSection.classList.add('inactive');
  
  movieDetailSection.classList.add('inactive');
  
  getCategoryMoviesPreview();
  getTrendingMoviesPreview();
  console.log('Home');
  
}

function searchPage(){

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  
  categoriesPreviewSection.classList.add('inactive');
  
  genericSection.classList.remove('inactive');
  
  movieDetailSection.classList.add('inactive');

  const [,query]  = location.hash.split('=');

  getMoviesBySearch(query);

  infiniteScroll  = getPaginatedMoviesBySearch(query);

  console.log('Search');
  
}

function movieDetailsPage(){

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  
  categoriesPreviewSection.classList.add('inactive');
  
  genericSection.classList.add('inactive');
  
  movieDetailSection.classList.remove('inactive');

  const [,movieId] = location.hash.split('=');

  getMovieById(movieId);
  
  
  console.log('detailMovie');
  
}

function categoriesPage(){
  
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  
  categoriesPreviewSection.classList.add('inactive');
  
  genericSection.classList.remove('inactive');
  
  movieDetailSection.classList.add('inactive');
  
  console.log('category Movies');

  const [,categoryIdName]  = location.hash.split('=');
  const [categoryId, categoryName] = categoryIdName.split('-');

  headerCategoryTitle.innerText = categoryName;

  getMoviesByCategory(categoryId);

  infiniteScroll  = getPaginatedMoviesByCategory(categoryId);

}

function trendsPage(){

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  
  categoriesPreviewSection.classList.add('inactive');
  
  genericSection.classList.remove('inactive');
  
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerText = 'Tendencias';

  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;

  console.log('Trending');

}