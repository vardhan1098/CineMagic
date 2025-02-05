import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addfavorite,
  removefavorites,
} from "../../redux/action/favoriteAction";
import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removefavorites(movie.imdbID));
    } else {
      dispatch(addfavorite(movie));
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg border transition-all duration-300 
    ${
      darkMode
        ? "bg-gray-900 text-white border-gray-700"
        : "bg-white text-gray-900 border-gray-300"
    }
    hover:shadow-xl`}
    >
      <div className="relative">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-[380px] object-cover
       rounded-lg transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h2 className="font-bold text-lg sm:text-xl">{movie.Title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{movie.Year}</p>

        <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

        <div className="flex justify-between items-center">
          <Link
            to={`/movie/${movie.imdbID}`}
            className="text-blue-500 hover:text-blue-700 transition-all duration-200 font-semibold"
          >
            Details
          </Link>

          <button
            onClick={toggleFavorite}
            className={`text-2xl transition-transform duration-200 active:scale-90 p-2 rounded-lg 
          ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
