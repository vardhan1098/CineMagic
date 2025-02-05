import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMovieDetails } from "../../redux/action/movieAction";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { imdbID } = useParams();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const selectedMovie = useSelector((state) => state.movies.selectedMovie);
  const loading = useSelector((state) => state.movies.loading);

  console.log(selectedMovie);

  useEffect(() => {
    dispatch(fetchMovieDetails(imdbID));
  }, [dispatch, imdbID]);

  if (loading) {
    return <div className="text-center p-4">Loading movie details...</div>;
  }

  if (!selectedMovie) {
    return <div className="text-center p-4 text-red-500">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="flex-shrink-0 md:w-1/3">
        <img
          src={selectedMovie.Poster}
          alt={selectedMovie.Title}
          className="rounded-lg shadow-lg w-full"
        />
        <button className="p-4 m-4 bg-red-400 rounded-full text-white hover:bg-red-600 cursor-pointer">
          ▶️PlayOnline
        </button>
      </div>

      <div className="md:ml-8 mt-4 md:mt-0 flex-grow">
        <h1
          className={`text-3xl font-bold mb-2 ${
            darkMode ? "text-white" : null
          }`}
        >
          {selectedMovie.Title}
        </h1>
        <p className={`mb-4 ${darkMode ? "text-amber-50" : "text-gray-700"}`}>
          {selectedMovie.Year} • {selectedMovie.Rated} • {selectedMovie.Runtime}
        </p>
        <p className={`${darkMode ? "text-yellow-50" : "text-gray-700"} mb-6`}>
          {selectedMovie.Plot}
        </p>

        <div className="border-t border-gray-300 my-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h4 className={`font-bold ${darkMode ? "text-amber-100" : null}`}>
              Directed By
            </h4>
            <p className="text-gray-600">{selectedMovie.Director}</p>
          </div>
          <div>
            <h4 className={`font-bold ${darkMode ? "text-amber-100" : null}`}>
              Written By
            </h4>
            <p className="text-gray-600">{selectedMovie.Writer}</p>
          </div>
          <div>
            <h4 className={`font-bold ${darkMode ? "text-amber-100" : null}`}>
              Genre
            </h4>
            <p className="text-gray-600">{selectedMovie.Genre}</p>
          </div>
          <div>
            <h4 className={`font-bold ${darkMode ? "text-amber-100" : null}`}>
              Language
            </h4>
            <p className="text-gray-600">{selectedMovie.Language}</p>
          </div>
          <div>
            <h4 className={`font-bold ${darkMode ? "text-amber-100" : null}`}>
              Rating
            </h4>
            <p className="text-gray-600">{selectedMovie.imdbRating}/10</p>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>
        <h2
          className={`text-2xl font-bold mt-6 mb-4 ${
            darkMode ? "text-amber-50" : null
          }`}
        >
          Cast
        </h2>
        <div className="flex space-x-4">
          {selectedMovie.Actors?.split(", ").map((actor, index) => (
            <div key={index} className="w-24 flex-shrink-0 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <p className={`text-sm ${darkMode ? "text-amber-100":null}`}>{actor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
