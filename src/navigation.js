
window.addEventListener('DOMContentLoaded', navigator,false);
window.addEventListener('hashchange', navigator,false);

function navigator(){

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
}


function trendsPage(){
  console.log('trendingMovies');
  
}
function searchPage(){
  console.log('Search');
  
}
function movieDetailsPage(){
  console.log('detailMovie');
  
}
function categoriesPage(){
  console.log('category Movies');
  
}
function homePage(){
  console.log('Home');
  getCategoryMoviesPreview();
  getTrendingMoviesPreview();
}