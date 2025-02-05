import {
  ADD_FAVORITE_MOVIE,
  DELETE_FAVORITE_MOVIE,
} from "../action/favoriteAction";

export const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_MOVIE:
      const updatedFavs = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      return { ...state, favorites: updatedFavs };
    case DELETE_FAVORITE_MOVIE:
      const filteredFavs = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload
      );

      localStorage.setItem("favorites", JSON.stringify(filteredFavs));
      return { ...state, favorites: filteredFavs };
    default:
      return state;
  }
};
