import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toggleTheme } from "../../redux/reducers/themeReducer";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          🎬 CineMagic
        </Link>

        <div className="flex items-center gap-5">
         
          <button
            onClick={() => dispatch(toggleTheme())}
            className="text-2xl cursor-pointer transition-transform transform hover:scale-110"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <Link
            to="/favorites"
            className="mr-4 text-xl hover:text-red-400 transition"
          >
            ❤️ Favorites
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
