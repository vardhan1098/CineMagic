import {
  FETCH_MOVIES_DETAILS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
} from "../action/movieAction";

export const initialState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  page: 1, 
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.movies, // Store movies for infinite scroll
        page: action.payload.page, // Track current page
        loading: false,
      };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_MOVIES_DETAILS:
      return { ...state, loading: false, selectedMovie: action.payload };
    default:
      return state;
  }
};
