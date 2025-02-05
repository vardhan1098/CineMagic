import React, { useState, useEffect } from "react";
import Header from "./components/common/Header";
import Approutes from "./routes/Approutes";
import Footer from "./components/common/Footer";
import { useSelector } from "react-redux";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-black" : "bg-[#D1E8E2] text-black"
      }`}
    >
      <Header />
      <main className="flex-grow">
        <Approutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
