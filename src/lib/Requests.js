const API_KEY = process.env.REACT_APP_API_KEY;

const Requests = {
  fetchTrending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&vote_count.gte=500&with_original_language=en`,
  fetchNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&vote_count.gte=500&with_original_language=en`,
  fetchTrendingOnNetflix: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213&vote_count.gte=500&with_original_language=en`,
  fetchPopularMovie: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&vote_count.gte=500&with_original_language=en`,
  fetchPopularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&vote_count.gte=500&with_original_language=en`,
  fetchTopRatedMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&vote_count.gte=500&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_original_language=en`,
  fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&vote_count.gte=500&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_original_language=en`,
  fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&vote_count.gte=500&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_original_language=en`,
  fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&vote_count.gte=500&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10749&with_original_language=en`,
  fetchAnimatedMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&vote_count.gte=500&include_adult=false&include_video=false&page=1&with_genres=16&with_original_language=en`,
  fetchDisneyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&with_companies=3&with_original_language=en`,
  fetchMarvelMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&with_companies=420&with_original_language=en`,
  fetchDCMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&with_companies=429&with_original_language=en`,
  fetchStarWarsMovies: `https://api.themoviedb.org/3/collection/10?api_key=${API_KEY}&language=en-US`,
  fetchMovieDetails: `https://api.themoviedb.org/3/movie/615457?api_key=${API_KEY}&language=en-US`,
  fetchTvDetails: `https://api.themoviedb.org/3/tv/615457?api_key=${API_KEY}&language=en-US`,
};

export default Requests;
