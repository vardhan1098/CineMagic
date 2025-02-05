import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/action/movieAction";
import MovieCard from "./MovieCard";
import SearchBar from "../common/SearchBar";
import Filter from "../../pages/Filter";

const MovieList = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { movies, loading, page, totalResults } = useSelector(
    (state) => state.movies
  );
  const [query, setQuery] = useState("");
  const observer = useRef();
  const [filters, setFilters] = useState({ year: "", genre: "", sort: "" });


  useEffect(() => {
    console.log("Fetching movies with filters: ", filters);
    dispatch(fetchMovies(query, 1, filters)); 
  }, [dispatch, query, filters]); 

  const handleSearch = (searchQuery) => {
    console.log("Search query: ", searchQuery); 
    setQuery(searchQuery);
    dispatch(fetchMovies(searchQuery, 1, filters));
  };

  const handleFilter = (newFilters) => {
    setFilters((prevFilter) => ({ ...prevFilter, ...newFilters }));

    dispatch(fetchMovies(query, 1, newFilters));
  };

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      const isLastPage = movies.length >= totalResults;
      if (isLastPage) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLastPage) {
          dispatch(fetchMovies(query, page + 1, filters));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, query, page, totalResults, movies.length, filters, dispatch]
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-7 mb-5 items-center md:items-start justify-center md:justify-center">
        <SearchBar query={query} onSearch={handleSearch} />
        <Filter filters={filters} onFilterChange={handleFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-12">
        {movies?.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <div key={movie.imdbID} ref={lastMovieRef}>
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return (
              <MovieCard darkMode={darkMode} key={movie.imdbID} movie={movie} />
            );
          }
        })}
      </div>

      {loading && <p className="text-center mt-4">Loading more movies...</p>}
    </div>
  );
};

export default MovieList;
