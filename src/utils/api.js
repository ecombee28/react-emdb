import axios from "axios";
import Requests from "../lib/Requests";

const API_KEY = process.env.REACT_APP_API_KEY;
const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY;

/**
 *Makes a GET request to the movie api based on the id parameter
 * @param {*} id
 * @returns
 * A object
 */
export const getMovieDetails = async (id) => {
  try {
    const movieData = await axios.get(
      `https://api.themoviedb.org/3/movie/${id.movieId}?api_key=${API_KEY}`
    );
    const res = await movieData.data;

    const fetchData = await axios.get(
      `https://www.omdbapi.com/?i=${movieData.data.imdb_id}&apikey=${IMDB_API_KEY}`
    );
    return { ...res, ...fetchData.data };
  } catch (error) {
    console.error(error);
  }
};

/**
 *Makes a GET request to the tv api based on the id parameter
 * @param {*} id
 * @returns
 * A object
 */

export const getTvDetails = async (id) => {
  try {
    const movieData = await axios.get(
      `https://api.themoviedb.org/3/tv/${id.movieId}?api_key=${API_KEY}`
    );
    const res = await movieData.data;

    return res;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {*} type
 * @param {*} id
 * @returns
 */
export async function getTrailer(type, id) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id.movieId}/videos?api_key=${API_KEY}&language=en-US`
    );

    const trailer = await fetchData.data.results.filter((t) => {
      return t.type === "Trailer" && t.site === "YouTube";
    });

    return trailer;
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {*} type
 * @param {*} id
 * @returns
 */
export async function getRecommended(type, id) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id.movieId}/recommendations?api_key=${API_KEY}&with_original_language=en&language=en-US&page=1`
    );
    return fetchData.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {*} type
 * @param {*} id
 * @returns
 */
export async function getCredits(type, id) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id.movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
    if (fetchData.data.cast.length > 6) {
      return fetchData.data.cast.slice(0, 6);
    } else if (
      fetchData.data.cast.length >= 1 &&
      fetchData.data.cast.length <= 6
    ) {
      return fetchData.data.cast.slice(0, fetchData.data.cast.length);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {*} type
 * @param {*} userId
 * @param {*} movieId
 * @returns
 */
export async function getMovieCount(userId, movieId) {
  try {
    const fetchData = await axios.get(
      `https://combeecreations.com/emdbapi/public/api/user/${userId}/movie/${movieId}`
    );
    return fetchData.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {*} id
 * @returns
 */

/**
 *
 * @param {*} id
 * @param {*} movieId
 * @param {*} type
 * @param {*} name
 * @param {*} imagePath
 * @returns
 */
export async function addMovieToWatchList(id, movieId, type, name, imagePath) {
  try {
    const fetchData = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/addmovies`,
      {
        userId: id,
        movieId: movieId,
        type: type,
        name: name,
        imagePath: imagePath,
      }
    );
    return fetchData.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {*} movieId
 * @param {*} id
 * @returns
 */
export async function removeMovieFromWatchList(movieId, id) {
  try {
    const fetchData = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/deletemovies`,
      {
        movieId: movieId,
        userId: id,
      }
    );
    return fetchData.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {*} movieId
 * @param {*} id
 * @returns
 */
export async function getCollections(page, company) {
  console.log("company ", page);
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=500&with_companies=${company}&with_original_language=en`
    );

    return fetchData.data;
  } catch (error) {
    console.error(error);
  }
}
/**
 *
 * @param {*} query
 * @returns
 */
export async function getSearchResults(query) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&with_original_language=en&language=en-US&query=${query}&page=1&include_adult=false`
    );
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsersMovies(userId, setMovies, setLoading) {
  try {
    const usersMovies = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/movies`,
      {
        userId: userId,
      }
    );

    await setMovies(usersMovies.data.Movies);

    setLoading(false);
  } catch (error) {
    console.error(error);
  }
}

export async function getStarWarsMovies() {
  try {
    const fetchData = await axios.get(Requests.fetchStarWarsMovies);
    return fetchData.data.parts;
  } catch (error) {
    console.error(error);
  }
}

export async function getTrending() {
  try {
    const fetchData = await axios.get(Requests.fetchTrending);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getPopular() {
  try {
    const fetchData = await axios.get(Requests.fetchPopularMovie);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getTrendingOnNetflix() {
  try {
    const fetchData = await axios.get(Requests.fetchTrendingOnNetflix);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getPopularTv() {
  try {
    const fetchData = await axios.get(Requests.fetchPopularTv);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getActionMovies() {
  try {
    const fetchData = await axios.get(Requests.fetchActionMovies);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getComedyMovies() {
  try {
    const fetchData = await axios.get(Requests.fetchComedyMovies);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getRomanceMovies() {
  try {
    const fetchData = await axios.get(Requests.fetchRomanceMovies);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getTopRatedMovies() {
  try {
    const fetchData = await axios.get(Requests.fetchTopRatedMovies);
    return fetchData.data.results;
  } catch (error) {
    console.error(error);
  }
}
/**
 *
 * @param {*} userNameInput
 * @param {*} password
 * @param {*} Cookie
 * @returns
 */
export async function login(userNameInput, password) {
  try {
    const loginUser = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/login`,
      {
        username: userNameInput,
        password: password,
      }
    );
    const loggedInUser = await loginUser.data;

    if (loggedInUser.status === "success") {
      const getUsersMovies = await axios.post(
        `https://combeecreations.com/emdbapi/public/api/movies`,
        {
          userId: loggedInUser.id,
        }
      );

      const movies = await getUsersMovies.data.Movies;

      return { ...loginUser.data, movies };
    } else {
      localStorage.setItem(
        "error_message",
        JSON.stringify(loggedInUser.error_message)
      );
      return loggedInUser;
    }
  } catch (error) {
    console.error(error);
  }
}
/**
 *
 * @param {*} userNameInput
 * @param {*} password
 * @param {*} setLoading
 * @returns
 */
export async function SignUpUser(userNameInput, password) {
  try {
    const addUser = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/adduser`,
      {
        username: userNameInput,
        password: password,
      }
    );
    const addUserResponse = await addUser.data;

    if (addUserResponse.status === "success") {
      return addUserResponse;
    } else {
      localStorage.setItem(
        "error_message",
        JSON.stringify(addUserResponse.error_message)
      );
      return addUserResponse;
    }
  } catch (error) {
    console.error(error);
  }
}
