export const ADD_FAVORITE_MOVIE = "ADD_FAVORITE_MOVIE";
export const DELETE_FAVORITE_MOVIE = "DELETE_FAVORITE_MOVIE";

export const addfavorite = (movie) => ({
  type: ADD_FAVORITE_MOVIE,
  payload: movie,
});

export const removefavorites = (id) => ({
  type: DELETE_FAVORITE_MOVIE,
  payload: id,
});
