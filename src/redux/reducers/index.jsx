import { combineReducers } from "redux";
import { movieReducer } from "./movieReducer";
import { favoriteReducer } from "./favoriteReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  movies: movieReducer,       
  favorites: favoriteReducer,
  theme: themeReducer,
});

export default rootReducer;
