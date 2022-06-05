export const getGenre = (movie) => {
  let genre = "";
  let newGenre;

  movie.genres.map((genreMap) => (genre += genreMap.name + ", "));

  newGenre = genre.substring(0, genre.length - 2);

  return newGenre;
};

export const getYear = (movie) => {
  let year, d;

  d = new Date(movie.release_date);
  year = d.getFullYear();

  return year;
};
