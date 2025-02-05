import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ query, onSearch }) => {
  const [searchInput, setSearchInput] = useState(query);

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6">
      <input
        type="text"
        placeholder="Search for movies"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={`border-none  p-2 w-64 rounded-l-md focus:outline ${
          darkMode ? "bg-amber-50 text-black" : "bg-white text-black"
        }`}
      />
      <button className="bg-gray-900 border-1 text-white cursor-pointer p-2 rounded-r-md hover:bg-green-400">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
