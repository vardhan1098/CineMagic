import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../movies/MovieCard";

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className="container mx-auto p-4">
      <h2
        className={`text-2xl font-bold mb-4 ${
          darkMode ? "text-white" : null
        }`}
      >
        Favorite Movies
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite movies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
