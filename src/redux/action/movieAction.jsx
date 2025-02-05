import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "41fd3fd2";

export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const FETCH_MOVIES_DETAILS = "FETCH_MOVIES_DETAILS";

export const fetchMovies =
  (query = "", page = 1, filters = {}) =>
  async (dispatch, getState) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });

    try {
      let url = `http://www.omdbapi.com/?s=${
        query || "marvel"
      }&page=${page}&apikey=${API_KEY}`;

      if (filters.year) {
        url += `&y=${filters.year}`;
      }

      const response = await axios.get(url);

      if (response.status !== 200 || !response.data.Search) {
        throw new Error("No movies found.");
      }

      let movies = response.data.Search;
      const totalResults =
        parseInt(response.data.totalResults, 10) || movies.length;

      if (movies.length === 0 && page > 1) return;
      const movieDetailsPromises = movies.map(async (movie) => {
        const details = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
        return { ...movie, imdbRating: details.data.imdbRating || 0, Genre: details.data.Genre || "" };
      });

      movies = await Promise.all(movieDetailsPromises);

      if (filters.genre) {
        movies = movies.filter((movie) => movie.Genre.includes(filters.genre));
      }

      if (filters.sort === "rating") {
        movies.sort((a, b) => (b.imdbRating || 0) - (a.imdbRating || 0));
      } else if (filters.sort === "alphabet") {
        movies.sort((a, b) => {
          const titleA = (a.Title || "").toUpperCase().trim();
          const titleB = (b.Title || "").toUpperCase().trim();
          
          return titleA.localeCompare(titleB, 'en', { sensitivity: 'base' });
        });
      }
      

      const { movies: currentMovies } = getState().movies;

      dispatch({
        type: FETCH_MOVIES_SUCCESS,
        payload: {
          movies: page === 1 ? movies : [...currentMovies, ...movies],
          page,
          totalResults,
        },
      });
    } catch (error) {
      dispatch({ type: FETCH_MOVIES_FAILURE, payload: error.message });
    }
  };
  
export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );

    if (response.status !== 200 || !response.data) {
      throw new Error("Movie details not found.");
    }

    dispatch({ type: FETCH_MOVIES_DETAILS, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};
