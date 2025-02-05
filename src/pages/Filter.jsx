import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Filter = ({ filters, onFilterChange }) => {
  const [year, setYear] = useState(filters.year);
  const [genre, setGenre] = useState(filters.genre);
  const [sort, setSort] = useState(filters.sort);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleApplyFilters = () => {
    onFilterChange({ year, genre, sort });
  };

  return (
    <motion.div
      className="flex flex-wrap gap-x-4 gap-y-2 md:gap-4 justify-center md:justify-start"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Year Filter */}
      <motion.input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className={`border p-2 rounded-md w-full sm:w-auto ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white border-gray-300"}`}
        whileFocus={{ scale: 1.05 }}
      />

      {/* Genre Filter */}
      <motion.select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className={`border p-2 rounded-md w-full sm:w-auto ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white border-gray-300"}`}
        whileHover={{ scale: 1.05 }}
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
      </motion.select>

      {/* Sorting Options */}
      <motion.select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={`border p-2 rounded-md w-full sm:w-auto ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white border-gray-300"}`}
        whileHover={{ scale: 1.05 }}
      >
        <option value="">Sort By</option>
        <option value="rating">Rating (High to Low)</option>
        <option value="alphabet">Alphabetical (A-Z)</option>
      </motion.select>

      {/* Apply Button with Animation */}
      <motion.button
        onClick={handleApplyFilters}
        className="bg-amber-600 text-white p-2 rounded-md w-full sm:w-auto hover:bg-green-600 transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Apply
      </motion.button>
    </motion.div>
  );
};

export default Filter;
